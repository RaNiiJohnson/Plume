/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPost } from "../actions/postAction";
import { Spotlight } from "../components/ui/Spotlight";
import { Post } from "../features/posts/Post";

function Home() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPost,
  });

  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  return (
    <div>
      <Spotlight
        className="fixed left-0 -top-40 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col gap-3 webkit">
        {data?.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}> <Post post={post} /></Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
