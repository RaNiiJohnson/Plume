import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../actions/postAction";
import { getCurrentUser } from "../../../actions/userAction";
import { Avatar } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import { LoggedInButton } from "../layout/LoggedInButton";

export function Profil() {
  // const isLoggedIn = !!localStorage.getItem("user");
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: posts } = useQuery({
    queryKey: [user?.pseudo, "posts"],
    queryFn: getPosts,
  });

  const postUSer = posts?.filter((post) => post.posterId === user?.id);
  console.log(user);
  console.log(posts);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="sm">
          <Avatar className="w-6 h-6 mr-2">
            <img crossOrigin="anonymous" src={user?.picture}></img>
          </Avatar>
          {user?.pseudo}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <img
            className="w-[100px]"
            crossOrigin="anonymous"
            src={user?.picture}
          />
          <SheetTitle>{user?.pseudo}</SheetTitle>
        </SheetHeader>
        <div className="max-h-[60vh] overflow-y-scroll posts">
          <Table className="w-full m-auto bg-secondary/25">
            <TableBody>
              {postUSer?.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <SheetClose asChild>
                      <Link
                        className="block w-full h-full "
                        key={post._id}
                        to={`/post/${post._id}`}
                      >
                        {" "}
                        <img
                          crossOrigin="anonymous"
                          src={post.pochette}
                          className="bg-contain size-10"
                        />
                      </Link>
                    </SheetClose>
                  </TableCell>
                  <TableCell>
                    <SheetClose asChild>
                      <Link
                        className="block w-full h-full "
                        key={post._id}
                        to={`/post/${post._id}`}
                      >
                        <span className="font-bold text-wrap">
                          {post.artist}
                        </span>
                      </Link>
                    </SheetClose>
                  </TableCell>
                  <TableCell>
                    <SheetClose asChild>
                      <Link
                        className="block w-full h-full "
                        key={post._id}
                        to={`/post/${post._id}`}
                      >
                        <span className="font-protest text-wrap">
                          {" "}
                          {post.title}
                        </span>
                      </Link>
                    </SheetClose>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <SheetFooter className="fixed right-10 bottom-4">
          <LoggedInButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
