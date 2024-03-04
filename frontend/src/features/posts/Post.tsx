import { PostType } from "../../utils/post.schema";

// export const Post = ({ post }: { post: PostType }) => {
//   return <div>{post.artist}</div>;
// };

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "../../components/ui/table";
import { usersType } from "../../utils/user.schema";

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
    <TableRow className="flex items-center sm:text-xl">
      <TableCell className="w-[5vw]">{index}</TableCell>
      <TableCell className="w-15vw">
        <img
          crossOrigin="anonymous"
          src="http://localhost:5000/pochettes/default-pochette.jpg"
          className="bg-contain size-14"
        />
      </TableCell>
      <Link to={`/post/${post._id}`}>
        <TableCell className="w-[32vw] md:w-[25vw] lg:w-[24vw] font-semibold">
          {limiterText(post.artist, 13)}
        </TableCell>
      </Link>

      <Link to={`/post/${post._id}`}>
        <TableCell className="w-[40vw] flex-1 font-protest text-secondary-foreground/65">
          {limiterText(post.title, 13)}
        </TableCell>
      </Link>
      <TableCell className="z-50">
        <Heart />
      </TableCell>
    </TableRow>
  );
};
