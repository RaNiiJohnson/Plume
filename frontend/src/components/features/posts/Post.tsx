import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { likePostFn } from "../../../actions/postAction";
import { getCurrentUser } from "../../../actions/userAction";
import { PostType } from "../../../utils/post.schema";
import { TableCell, TableRow } from "../../ui/table";

const limiterText = (text: string, limiter: number) => {
  const words = text.replace(/[^a-zA-Z\s]/g, "").split("");
  if (words.length > limiter) {
    return words.slice(0, limiter).join("") + "...";
  }

  return text;
};
export const Post = ({ post, index }: { post: PostType; index: number }) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const likePost = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      likePostFn(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["Post", post._id] });
    },
  });

  return (
    <TableRow className="flex my-2 text-xl max-sm:text-lg">
      <TableCell className="w-[5vw]">
        <Link
          className="block w-full h-full "
          key={post._id}
          to={`/post/${post._id}`}
        >
          <span className="flex items-center justify-center h-full pl-2 lg:pl-4">
            {index}
          </span>
        </Link>
      </TableCell>
      <TableCell className="w-15vw">
        <Link
          className="block w-full h-full "
          key={post._id}
          to={`/post/${post._id}`}
        >
          <img
            crossOrigin="anonymous"
            src={post.pochette}
            className="object-cover size-14"
          />
        </Link>
      </TableCell>
      <TableCell className="w-[32vw] md:w-[25vw] lg:w-[24vw] font-semibold">
        <Link
          className="block w-full h-full "
          key={post._id}
          to={`/post/${post._id}`}
        >
          <span className="flex items-center h-full pl-2 lg:pl-4 ">
            {limiterText(post.artist, 13)}
          </span>
        </Link>
      </TableCell>

      <TableCell className="w-[40vw] flex-1 font-protest text-secondary-foreground/65">
        <Link
          className="block w-full h-full "
          key={post._id}
          to={`/post/${post._id}`}
        >
          <span className="flex items-center h-full pl-2 lg:pl-4 ">
            {limiterText(post.title, 13)}
          </span>
        </Link>
      </TableCell>
      <TableCell className="w-[4vw] relative">
        <span className="flex items-center justify-center h-full ">
          <HeartFilledIcon
            className={clsx("transition cursor-pointer ", {
              "text-primary size-6": user && post.likers.includes(user?._id),
              "text-secondary-foreground/40":
                (user && !post.likers.includes(user?._id)) || !user,
            })}
            onClick={() => {
              user
                ? likePost.mutate({ postId: post._id, userId: user._id })
                : console.log("no user");
            }}
          />
          <span className="absolute text-xs right-2 bottom-2">
            {post.likers.length}
          </span>
        </span>
      </TableCell>
    </TableRow>
  );
};
