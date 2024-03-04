/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { getPost } from "../actions/postAction";
import { getUsers } from "../actions/userAction";
import Welcome from "../components/Welcome";
import { Spotlight } from "../components/ui/Spotlight";
import { Post } from "../features/posts/Post";

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
    <div>
      <Spotlight
        className="fixed left-0 -top-40 md:left-60 md:-top-20"
        fill="white"
      />
      <Welcome />
      <div className="webkit" style={styles}>
        {dataPost?.map((post) => (
          <div key={post._id}>
            <Post post={post} users={dataUser} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

const styles = {
  margin: "0 auto",
  padding: 0,
  backgroundColor: "black",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 30rem)",
  justifyContent: "center",
};
