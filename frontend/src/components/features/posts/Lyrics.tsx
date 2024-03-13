import { HeartFilledIcon } from "@radix-ui/react-icons";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import clsx from "clsx";
import { MessageSquare } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { likePostFn } from "../../../actions/postAction";
import { dateParser } from "../../../utils/date";
import { PostType, PostUpdateSchemaType } from "../../../utils/post.schema";
import { userType } from "../../../utils/user.schema";
import { ContentTextArea } from "../../ContentTextArea";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

type LyricsType = {
  user: userType | undefined | null;
  post: PostType;
  id: string;
  bgColor: string;
  poster:
    | {
        _id: string;
        pseudo: string;
        picture?: string | undefined;
      }
    | undefined;
  updatePost: UseMutationResult<
    unknown,
    Error,
    {
      postData: PostUpdateSchemaType;
      postId: string;
    },
    unknown
  >;
};

export default function Lyrics({
  post,
  user,
  poster,
  id,
  updatePost,
  bgColor,
}: LyricsType) {
  const [textEdit, setTextEdit] = useState(false);
  const [lyricsData, setLyrics] = useState("");

  const queryClient = useQueryClient();

  const likePost = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      likePostFn(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
    },
  });

  const lyrics = post?.lyrics.split("\n\n");
  const text = lyrics?.map((lines, index) => (
    <div key={index} className="font-victor">
      {lines.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
      <br />
    </div>
  ));

  const handleText: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (user) {
      const postData = {
        posterId: user._id,
        lyrics: lyricsData,
      };

      updatePost.mutate({ postData, postId: id });

      setTextEdit(false);
    }
  };

  return (
    <div className="px-2 border-l-2">
      {!textEdit ? (
        <>{text}</>
      ) : (
        <ContentTextArea
          className="my-2 text-sm font-victor"
          defaultValue={post.lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          autoFocus
        />
      )}
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-secondary-foreground/45">
        <div className="flex items-center gap-2 text-secondary-foreground">
          <div className="flex items-center gap-0.5">
            <HeartFilledIcon
              className={clsx("transition cursor-pointer ", {
                "text-primary ": user && post.likers.includes(user?._id),
                "text-secondary-foreground":
                  (user && !post.likers.includes(user?._id)) || !user,
              })}
              onClick={() => {
                user
                  ? likePost.mutate({ postId: post._id, userId: user._id })
                  : console.log("no user");
              }}
            />
            <span>{post.likers.length}</span>
          </div>
          {" ‧ "}
          <div className="flex items-center gap-1 text-secondary-foreground">
            <Label htmlFor="comment" className="cursor-pointer">
              <MessageSquare size={15} />
            </Label>
            {post.comments.length}
          </div>

          {user && user?._id === poster?._id && (
            <>
              <div>
                <Button
                  variant={"link"}
                  size={"icon"}
                  className="ml-4 text-secondary-foreground/80"
                  onClick={() => setTextEdit(!textEdit)}
                >
                  {!textEdit ? "Modifier" : "Annuler"}
                </Button>
              </div>
              <form onSubmit={handleText}>
                {textEdit && (
                  <Button
                    disabled={updatePost.isPending}
                    style={{
                      background: `${bgColor}`,
                    }}
                    className={`mx-2 bg-`}
                    type="submit"
                    size={"sm"}
                  >
                    <span className="mix-blend-difference">Confirmer</span>
                  </Button>
                )}
              </form>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <div>{dateParser(post.createdAt)}</div>
          {" ‧ "}
          <div className="text-primary "> {poster?.pseudo}</div>
        </div>
      </div>
    </div>
  );
}
