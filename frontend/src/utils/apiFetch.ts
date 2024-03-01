/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from "axios";
// type PostType = {
//   posterId: string;
//   description: string;
//   artist: string;
//   title: string;
// };

export async function loadPost() {
  const res = await fetch("http://localhost:5000/api/posts/", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.log(res);
  }
  console.log(data);
}
