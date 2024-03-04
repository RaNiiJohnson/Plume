import { PostType } from "../../utils/post.schema";

// export const Post = ({ post }: { post: PostType }) => {
//   return <div>{post.artist}</div>;
// };

import { Heart, MessageCircle } from "lucide-react";
import Markdown from "react-markdown";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import { Button } from "../../components/ui/button";
import { usersType } from "../../utils/user.schema";

const limiterText = (text: string) => {
  const words = text.replace(/[^a-zA-Z\s]/g, "").split("");
  const limiter = Math.random() * 100 + 50;
  if (words.length > limiter) {
    return words.slice(0, limiter).join("") + "...";
  }

  return text;
};

export const Post = ({ post, users }: { post: PostType; users: usersType }) => {
  const poster = users.find((user) => user._id === post.posterId);
  return (
    // <Link to={`/post/${post._id}`}>
    <CardContainer className="mt-2 inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {post.artist} ~ <span className="text-primary ">{post.title}</span>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Markdown className="prose whitespace-pre-wrap dark:prose-invert">
            {limiterText(post.lyrics)}
          </Markdown>
        </CardItem>
        <div className="flex items-center justify-between mt-5">
          <CardItem translateZ={20} as="button" className="text-xs rounded-xl">
            {poster?.pseudo}
          </CardItem>
          <div>
            <CardItem
              translateZ={20}
              as="button"
              className="text-xs rounded-xl"
            >
              <Button variant={"ghost"}>
                <Heart />
              </Button>
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="text-xs rounded-xl"
            >
              <Button variant={"ghost"}>
                <MessageCircle />
              </Button>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
    // </Link>
  );
};

// import { FollowerPointerCard } from "../../components/ui/following-pointer";

// export const Post = ({ post }: { post: PostType }) => {
//   return (
//     <div className="mx-auto w-80">
//       <FollowerPointerCard
//         title={
//           <TitleComponent
//             title={blogContent.author}
//             avatar={blogContent.authorAvatar}
//           />
//         }
//       >
//         <div className="relative h-full overflow-hidden transition duration-200 bg-white border rounded-2xl group hover:shadow-xl border-zinc-100">
//           <div className="relative w-full overflow-hidden bg-gray-100 rounded-tl-lg rounded-tr-lg aspect-w-16 aspect-h-10 xl:aspect-w-16 xl:aspect-h-10">
//             {/* <Image
//                src={blogContent.image}
//                alt="thumbnail"
//                layout="fill"
//                objectFit="cover"
//                className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
//              /> */}
//           </div>
//           <div className="p-4 ">
//             <h2 className="my-4 text-lg font-bold text-zinc-700">
//               {blogContent.title}
//             </h2>
//             <h2 className="my-4 text-sm font-normal text-zinc-500">
//               {blogContent.description}
//             </h2>
//             <div className="flex flex-row items-center justify-between mt-10">
//               <span className="text-sm text-gray-500">{blogContent.date}</span>
//               <div className="relative z-10 block px-6 py-2 text-xs font-bold text-white bg-black rounded-xl">
//                 Read More
//               </div>
//             </div>
//           </div>
//         </div>
//       </FollowerPointerCard>
//     </div>
//   );
// };

// const blogContent = {
//   slug: "amazing-tailwindcss-grid-layouts",
//   author: "Manu Arora",
//   date: "28th March, 2023",
//   title: "Amazing Tailwindcss Grid Layout Examples",
//   description:
//     "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
//   image: "/demo/thumbnail.png",
//   authorAvatar: "/manu.png",
// };

// const TitleComponent = ({
//   title,
//   avatar,
// }: {
//   title: string;
//   avatar: string;
// }) => (
//   <div className="flex items-center space-x-2">
//     {/* <Image
//        src={avatar}
//        height="20"
//        width="20"
//        alt="thumbnail"
//        className="border-2 border-white rounded-full"
//      /> */}
//     <p>{title}</p>
//   </div>
// );
