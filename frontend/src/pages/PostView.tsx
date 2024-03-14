import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import colorThief from "colorthief";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost, updatePostFn } from "../actions/postAction";
import { getCurrentUser, getUsers } from "../actions/userAction";
import Comment from "../components/features/posts/Comment";
import Cover from "../components/features/posts/Cover";
import LeftHead from "../components/features/posts/LeftHead";
import Lyrics from "../components/features/posts/Lyrics";
import { PostUpdateSchemaType } from "../utils/post.schema";

export default function PostView() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const { id } = useParams();

  const {
    data: post,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Post", id],
    queryFn: () => getPost(String(id)),
    enabled: id !== undefined,
  });

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const updatePost = useMutation({
    mutationFn: ({
      postData,
      postId,
    }: {
      postData: PostUpdateSchemaType;
      postId: string;
    }) => updatePostFn(postData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });

  useEffect(() => {
    if (post) {
      const imageUrl = post.pochette;
      const thief = new colorThief();

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageUrl as string;

      const handleImageLoad = () => {
        const dominantColor = thief.getColor(image);
        const result = thief.getPalette(image);
        const rgbColor = `rgb(${dominantColor.join(",")})`;
        const rgbColorPrime = `rgb(${result[result.length - 3].join(",")})`;
        console.log(dominantColor);
        // console.log(rgbColorPrime);
        setBackgroundColor(rgbColorPrime);
        setBgColor(rgbColor);
      };

      image.onload = handleImageLoad;

      return () => {
        image.onload = null; // Clean up event listener
      };
    }
  }, [post, setBackgroundColor]);

  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  if (!post) return <div>No post found</div>;

  const poster = users?.find((u) => u._id === post.posterId);

  if (!id) return <>no id</>;

  return (
    <>
      <div
        className="z-10 w-full "
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${backgroundColor})`,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-10 m-auto max-w-7xl group">
          <LeftHead
            bgColor={bgColor}
            post={post}
            poster={poster}
            updatePost={updatePost}
            user={user}
          />
          <Cover
            id={id}
            post={post}
            poster={poster}
            updatePost={updatePost}
            user={user}
          />
        </div>
      </div>
      <div className="max-w-3xl p-2 m-auto prose divide-y-2 dark:prose-invert">
        <Lyrics
          bgColor={bgColor}
          id={id}
          post={post}
          poster={poster}
          updatePost={updatePost}
          user={user}
        />

        <Comment bgColor={bgColor} id={id} post={post} user={user} />
      </div>
    </>
  );
}
