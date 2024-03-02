/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spotlight } from "./components/ui/Spotlight";

// const getPost = async () => {
//   const res = await fetch("http://localhost:5000/api/posts", {
//     method: "GET",
//     headers: {
//       "content-Type": "application/json",
//     },
//   });
//   const data = await res.json();

//   return data;
//   // console.log(data);
//   // .then(PostsResponseSchema.parse);
// };

function App() {
  // const { data, error, isError, isLoading } = useQuery({
  //   queryKey: ["Posts"],
  //   queryFn: getPost,
  // });

  // if (isError || error) return <p>Something went wrong</p>;

  // if (isLoading) return <>loading</>;

  return (
    <div>
      <Spotlight
        className="left-0 -top-40 md:left-60 md:-top-20"
        fill="white"
      />
      {/* {data?.post.map((p) => (
        <div key={p._id}>{p.artist}</div>
      ))} */}
    </div>
  );
}

export default App;
