/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { getPost } from "../actions/postAction";
import { getUsers } from "../actions/userAction";
import { Welcome } from "../components/Welcome";
import { Spotlight } from "../components/ui/Spotlight";

function Home() {
  const {
    data: dataPost,
    isError: postError,
    isLoading: postLoading,
  } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPost,
  });

  const { data: dataUser, isError: userError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (userError || postError) return <p>Something went wrong</p>;

  if (postLoading) return <>loading</>;

  if (!dataUser) return;

  return (
    <>
      <div className="absolute h-[40rem] -z-0 w-full rounded-md flex md:items-center md:justify-center -top-0 antialiased bg-grid-white/[0.02] overflow-hidden">
        <Spotlight
          className="left-0 -top-40 md:left-60 md:-top-20"
          fill="white"
        />
      </div>

      {dataPost && <Welcome />}
    </>
  );
}

export default Home;
