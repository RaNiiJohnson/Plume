import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler } from "react";
import { CommentType, commentPostFn } from "../../../actions/postAction";
import { formatDate } from "../../../utils/date";
import { PostType } from "../../../utils/post.schema";
import { userType } from "../../../utils/user.schema";
import { ContentTextArea2 } from "../../ContentTextArea2";
import { Button } from "../../ui/button";
import { AuthButton } from "../layout/AuthButton";

type CommentTypeComponent = {
  user: userType | undefined | null;
  post: PostType;
  id: string;
  bgColor: string;
};
export default function Comment({
  user,
  post,
  bgColor,
  id,
}: CommentTypeComponent) {
  const queryClient = useQueryClient();
  const commentPost = useMutation({
    mutationFn: ({
      commentData,
      postId,
    }: {
      commentData: CommentType;
      postId: string;
    }) => commentPostFn(commentData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const commentData = new FormData(form);
    const text = commentData.get("comment") as string;

    if (user) {
      const commentData = {
        commenterId: user._id,
        name: user.pseudo,
        text,
      };

      commentPost.mutate({ commentData, postId: id });
      form.reset();
    } else console.log("no user");
  };

  return (
    <div className="py-4 space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 sm:flex-row"
      >
        <ContentTextArea2
          disabled={!user}
          required
          id="comment"
          placeholder="Votre commentaire..."
          name="comment"
        />
        {user && (
          <Button
            disabled={commentPost.isPending}
            type="submit"
            size={"sm"}
            style={{
              background: `${bgColor}`,
            }}
          >
            <span className="mix-blend-difference">Commenter</span>
          </Button>
        )}
      </form>
      <div className="space-y-2">
        {post.comments
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((comment) => (
            <div
              key={comment._id}
              className="flex justify-between p-2 text-sm bg-secondary"
            >
              <div>
                <div className="font-bold">{comment.commenterPseudo}</div>
                <div className="text-secondary-foreground/65">
                  {comment.text}
                </div>
              </div>
              <div className="text-sm text-secondary-foreground/60">
                {formatDate(new Date(comment.timestamp))}
              </div>
            </div>
          ))}
        {post.comments.length < 1 && !!user && (
          <div className="flex justify-center text-sm text-secondary-foreground/35">
            Commenter en premier
          </div>
        )}
        {post.comments.length < 1 && !user && (
          <div className="flex items-center justify-center text-sm text-secondary-foreground/35">
            Veuillez vous <AuthButton flag={true} /> pour commenter en premier
          </div>
        )}
      </div>
    </div>
  );
}
