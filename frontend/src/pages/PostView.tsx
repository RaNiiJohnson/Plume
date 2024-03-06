import { useQuery } from "@tanstack/react-query";
import colorThief from "colorthief";
import { useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../actions/postAction";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

const PostView: React.FC = () => {
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

  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  if (!post) return <div>No post found</div>;

  const lyrics = post.lyrics.split("\n\n");

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
    setBgColor(rgbColor);
  };

  return (
    <>
      <div
        className="z-10 w-full "
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${backgroundColor})`,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-10 m-auto max-w-7xl">
          <div className="text-white mix-blend-hard-light">
            <div className="text-2xl font-semibold ">{post.title}</div>
            <div>{post.artist}</div>
            <div className="max-w-sm mt-2 text-sm text-white/40">
              {post.description}
            </div>
          </div>
          <div className="overflow-hidden">
            <CardContainer className="inter-var">
              <CardBody className=" group/card">
                <CardItem translateZ="100" className="w-full ">
                  <img
                    crossOrigin="anonymous"
                    src={post.pochette}
                    alt="pochette"
                    height="1000"
                    width="1000"
                    className=" w-[30vw] max-w-52 group-hover/card:shadow-xl"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <img />
          </div>
        </div>
      </div>
      <div className="max-w-3xl m-auto font-light prose dark:prose-invert">
        <div className="font-victor">
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
