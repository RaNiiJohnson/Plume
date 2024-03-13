import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import ColorThief from "colorthief";
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../../actions/postAction";
import { getCurrentUser } from "../../../actions/userAction";
import { ThemeToggle } from "../../ThemeToggle";
import { Button } from "../../ui/button";
import { AuthButton } from "./AuthButton";

export default function Header() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: ["Post", id],
    queryFn: () => getPost(String(id)),
    enabled: Boolean(id),
  });

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (post) {
      const imageUrl = post.pochette;
      const thief = new ColorThief();

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageUrl;

      const handleImageLoad = () => {
        const dominantColor = thief.getColor(image);
        const rgbColor = `rgb(${dominantColor.join(",")})`;
        console.log(rgbColor);
        setBackgroundColor(rgbColor);
      };

      image.onload = handleImageLoad;

      return () => {
        image.onload = null; // Clean up event listener
      };
    }
  }, [post, setBackgroundColor]);

  return (
    <div
      className="sticky top-0 z-50 w-screen shadow-sm backdrop-blur-md"
      style={post && { backgroundColor: backgroundColor }}
    >
      <div
        className={clsx("container w-full max-w-7xl m-auto max-sm:px-2 ", {
          "mix-blend-difference ": post,
        })}
      >
        <div className="flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center justify-center pl-2 pr-3 text-xl rounded-md font-protest text-primary">
            <Link to="/" className="flex items-center gap-1">
              Plume
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1 space-x-4">
            <nav className="z-50 flex items-center gap-10 space-x-1">
              {/* <SearchBar /> */}
              <div className="flex items-center gap-2">
                {user && (
                  <Button
                    className={clsx({ "text-white": post })}
                    variant="ghost"
                    size="icon"
                  >
                    <Link to={"/create-post"}>
                      <PenBox size={20} />
                    </Link>
                  </Button>
                )}
                <ThemeToggle post={post?._id} />
                <AuthButton post={post?._id} />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
