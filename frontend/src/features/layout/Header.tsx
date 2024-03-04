import { Pen } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../components/ThemeToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full max-w-4xl m-auto max-sm:px-2 sm:container backdrop-blur-sm">
      <div className="flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center justify-center pl-2 pr-3 text-xl rounded-md font-protest text-primary">
          <Link to={"/"} className="flex items-center gap-1">
            {/* <img
              src="/plume.png"
              className={clsx(
                buttonVariants({ variant: "link", size: "icon" }),
                ""
              )}
            /> */}
            Plume
            <Pen size={20} />
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
  );
}
