import { useQuery } from "@tanstack/react-query";
import colorThief from "colorthief";
import { useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../actions/postAction";

const PostView: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState("");

  const { id } = useParams();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Post"],
    queryFn: getPost,
  });

  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  const post = data && data.find((post) => post._id === id);
  const lyrics = post?.lyrics.split("\n\n");

  if (!post) return <div>No post found</div>;

  const imageUrl = post.pochette;
  const thief = new colorThief();

  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = imageUrl;

  image.onload = () => {
    const dominantColor = thief.getColor(image);
    const result = thief.getPalette(image);
    const rgbColor = `rgb(${dominantColor.join(",")})`;
    const rgbColorPrime = `rgb(${result[result.length - 1].join(",")})`;
    console.log(rgbColor);
    console.log(rgbColorPrime);
    setBackgroundColor(rgbColorPrime);
  };

  return (
    <>
      <div
        className="flex w-full px-4 py-10 "
        style={{ backgroundColor: backgroundColor }}
      >
        <div>
          <img
            crossOrigin="anonymous"
            src={post.pochette}
            alt=""
            className="w-[30vw] max-w-52"
          />
        </div>
        <div className="text-white mix-blend-hard-light">
          <div>{post.description}</div>
          <div>{post.artist}</div>
          <div>{post.description}</div>
        </div>
      </div>
      <div className="max-w-2xl m-auto prose dark:prose-invert">
        <div>
          {lyrics?.map((lines, index) => (
            <div key={index}>
              {lines.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostView;
