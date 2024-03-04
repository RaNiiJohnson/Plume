import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import ColorThief from "colorthief";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../actions/postAction";
import { ThemeToggle } from "../../components/ThemeToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["Post"],
    queryFn: getPost,
  });

  const post = data && data.find((post) => post._id === id);

  if (post) {
    const imageUrl = post.pochette;
    const thief = new ColorThief();

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;

    image.onload = () => {
      const dominantColor = thief.getColor(image);
      const rgbColor = `rgb(${dominantColor.join(",")})`;
      console.log(rgbColor);
      setBackgroundColor(rgbColor);
    };
  }

  return (
    <div
      className="w-screen"
      style={post && { backgroundColor: backgroundColor }}
    >
      <header
        className={clsx(
          "sticky top-0 z-50 w-full max-w-4xl m-auto max-sm:px-2 sm:container backdrop-blur-sm ",
          { "mix-blend-exclusion text-white": post }
        )}
      >
        <div className="flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center justify-center pl-2 pr-3 text-xl rounded-md font-protest text-primary">
            <Link to={"/"} className="flex items-center gap-1">
              Plume
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1 space-x-4">
            <nav className="flex items-center space-x-1">
              <SearchBar />
              {/* <AuthButton /> */}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
