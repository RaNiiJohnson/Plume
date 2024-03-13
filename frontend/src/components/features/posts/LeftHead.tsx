import { UseMutationResult } from "@tanstack/react-query";
import { Edit3 } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { PostType, PostUpdateSchemaType } from "../../../utils/post.schema";
import { userType } from "../../../utils/user.schema";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type LeftHeadType = {
  post: PostType;
  user: userType | undefined | null;
  updatePost: UseMutationResult<
    unknown,
    Error,
    {
      postData: PostUpdateSchemaType;
      postId: string;
    },
    unknown
  >;
  bgColor: string;
  poster:
    | {
        _id: string;
        pseudo: string;
        picture?: string | undefined;
      }
    | undefined;
};

export default function LeftHead({
  post,
  user,
  updatePost,
  bgColor,
  poster,
}: LeftHeadType) {
  const [plumeData, setData] = useState(false);

  const handleDataSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const description = formData.get("description") as string;

    if (user) {
      const postData = {
        posterId: user._id,
        title,
        artist,
        description,
      };

      updatePost.mutate({ postData, postId: post._id });
      setData(false);
    }
  };
  return (
    <div className="relative">
      {!plumeData && (
        <div className=" mix-blend-exclusion">
          <div className="flex items-center justify-between gap-4 text-2xl font-bold text-white">
            {post.title}
            {user && user?._id === poster?._id && (
              <Edit3
                className="hidden text-blue-200 cursor-pointer group-hover:block"
                onClick={() => setData(!plumeData)}
              />
            )}
          </div>

          <div className="font-semibold text-white">{post.artist}</div>
          <div className="max-w-sm mt-2 text-sm font-medium text-yellow-300/85">
            {post.description}
          </div>
        </div>
      )}
      {plumeData && (
        <form className="space-y-2" onSubmit={handleDataSubmit}>
          <div className="space-y-1 mix-blend-exclusion">
            <Input
              defaultValue={post.title}
              placeholder={post.title}
              className="text-white placeholder:text-foreground/40"
              name="title"
              autoFocus
            />
            <Input
              defaultValue={post.artist}
              placeholder={post.artist}
              className="text-white placeholder:text-foreground/40"
              name="artist"
            />
            <Input
              defaultValue={post.description}
              placeholder={post.description}
              className="text-white placeholder:text-foreground/40"
              name="description"
            />
          </div>
          <div className="space-x-1">
            <Button
              variant={"link"}
              size={"sm"}
              className="text-white mix-blend-exclusion"
              onClick={() => setData(false)}
            >
              Annuler
            </Button>{" "}
            <Button
              disabled={updatePost.isPending}
              type="submit"
              size={"sm"}
              style={{
                background: `${bgColor}`,
              }}
            >
              <span className="mix-blend-difference">Confirmer</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
