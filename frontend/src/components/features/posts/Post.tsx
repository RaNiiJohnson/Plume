import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { PostType } from "../../../utils/post.schema";
import { usersType } from "../../../utils/user.schema";
import { TableCell, TableRow } from "../../ui/table";

const limiterText = (text: string, limiter: number) => {
  const words = text.replace(/[^a-zA-Z\s]/g, "").split("");
  if (words.length > limiter) {
    return words.slice(0, limiter).join("") + "...";
  }

  return text;
};
export const Post = ({
  post,
  index,
}: {
  post: PostType;
  users: usersType;
  index: number;
}) => {
  // const poster = users.find((user) => user._id === post.posterId);
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
            className="bg-contain size-14"
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
      <TableCell className="w-[4vw]">
        <span className="flex items-center justify-center h-full ">
          <Heart />
        </span>
      </TableCell>
    </TableRow>
  );
};
