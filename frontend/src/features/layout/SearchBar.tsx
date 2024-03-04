import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../../components/ui/button";
import { PostType, PostsType } from "../../utils/post.schema";

const linesVariants = {
  visible: { x: 0, opacity: 1 },
  hidden: { x: 100, opacity: 0 },
};
const transitionVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function SearchBar() {
  const [result, setResult] = useState("");
  const [data, setData] = useState<PostsType>();
  const inputRef = useRef<HTMLInputElement>(null);

  const getPostFilter = async (value: string) => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data: PostsType = await res.json();
    const filter = data.filter((post) => {
      const artistMatch = post.artist.toLowerCase().includes(value);
      const titleMatch = post.title.toLowerCase().includes(value);
      return artistMatch || titleMatch;
    });
    setData(filter);
  };

  const handleChange = async (value: string) => {
    setResult(value);
    await getPostFilter(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setResult("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <div
        className={clsx(
          result ? "rounded-md rounded-b-none" : "rounded-md",
          "transition flex items-center gap-1 p-2  bg-secondary"
        )}
      >
        <label htmlFor="search">
          <Search
            className={clsx(
              result
                ? "text-secondary-foreground"
                : "text-secondary-foreground/35",
              "transition"
            )}
            size={25}
          />
        </label>
        <input
          value={result}
          onChange={(e) => handleChange(e.target.value)}
          id="search"
          className="bg-transparent w-36 focus:outline-none"
        />
        <X
          onClick={() => setResult("")}
          className={clsx(
            result ? "visible" : "invisible",
            "text-primary hover:text-green-500 cursor-pointer transition"
          )}
          size={20}
        />
      </div>
      {result && (
        <motion.div
          variants={transitionVariants}
          animate="visible"
          initial="hidden"
          className="absolute z-50 flex flex-col items-start p-1 overflow-hidden border-2 rounded-md min-w-48 max-w-56 top-10 bg-popover text-popover-foreground "
        >
          <AnimatePresence mode="popLayout">
            {data &&
              data.map((post) => (
                <MotionLines
                  post={post}
                  variants={linesVariants}
                  animate="visible"
                  initial="hidden"
                  exit="hidden"
                  layout
                  key={post._id}
                >
                  <div>
                    {post.artist} ~ {post.title}
                  </div>
                </MotionLines>
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

const Lines = forwardRef(
  (
    { children, post }: { children: React.ReactNode; post: PostType },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <Link
        to={`/post/${post._id}`}
        ref={ref}
        className={buttonVariants({
          variant: "ghost",
          className: "w-full",
        })}
      >
        {children}
      </Link>
    );
  }
);

const MotionLines = motion(Lines);
