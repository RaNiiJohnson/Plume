/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import clsx from "clsx";
import { Check, ImageUp, Undo } from "lucide-react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser, uploadFn } from "../../../actions/userAction";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Avatar } from "../../ui/avatar";
import { Button, buttonVariants } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Table, TableBody } from "../../ui/table";

type setType = {
  signOut: UseMutationResult<Response | undefined, Error, void, unknown>;
};

export default function Profil({ signOut }: setType) {
  const [file, setFile] = useState<File>();
  const [profil, setProfil] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // const { data: posts } = useQuery({
  //   queryKey: [user?.pseudo, "posts"],
  //   queryFn: getPosts,
  // });

  const upload = useMutation({
    mutationFn: (formData: FormData) => uploadFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  // const postUSer = posts?.filter((post) => post.posterId === user?._id);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setProfil(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClick: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (file && user) {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("photo", file);

      try {
        upload.mutate(formData);
        setProfil("");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      console.log("No file or user");
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="w-6 h-6 ml-2">
          <img crossOrigin="anonymous" src={user?.picture} />
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <form onSubmit={handleClick}>
            <input
              className="hidden"
              type="file"
              name="photo"
              onChange={onInputChange}
              id="file"
              accept=".jpg, .jpeg, .png"
            />
            <div className="relative justify-center flex m-auto  size-[25vh]">
              <label htmlFor="file">
                <img
                  className="cursor-pointer size-[25vh] object-cover "
                  crossOrigin="anonymous"
                  src={profil ? profil : user?.picture}
                />
                <div
                  className={clsx(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "absolute -bottom-4 -right-4"
                  )}
                >
                  <ImageUp />
                </div>
              </label>
              {profil && (
                <>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    type="submit"
                    className="absolute -bottom-4 -right-4"
                  >
                    <Check />
                  </Button>
                  <Button
                    onClick={() => setProfil("")}
                    variant={"outline"}
                    size={"icon"}
                    className="absolute -bottom-4 -left-4"
                  >
                    <Undo />
                  </Button>
                </>
              )}
            </div>
          </form>
          <SheetTitle>
            <span className="flex justify-center p-3 m-auto text-xl">
              {user?.pseudo}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="max-h-[55vh] overflow-y-scroll posts">
          <Table className="w-full m-auto bg-secondary/25">
            <TableBody>
              {/* {postUSer?.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <Link
                      className="block w-full h-full "
                      key={post._id}
                      to={`/post/${post._id}`}
                    >
                      <SheetClose asChild>
                        <img
                          crossOrigin="anonymous"
                          src={post.pochette}
                          className="bg-contain size-10"
                        />
                      </SheetClose>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="block w-full h-full "
                      key={post._id}
                      to={`/post/${post._id}`}
                    >
                      <SheetClose asChild>
                        <span className="block h-full font-bold text-wrap">
                          {post.artist}
                        </span>
                      </SheetClose>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="block w-full h-full "
                      key={post._id}
                      to={`/post/${post._id}`}
                    >
                      <SheetClose asChild>
                        <span className="block h-full font-protest f text-wrap">
                          {" "}
                          {post.title}
                        </span>
                      </SheetClose>
                    </Link>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
        <SheetFooter className="fixed right-10 bottom-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"sm"} variant={"destructive"}>
                Déconnexion
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Déconnexion?</AlertDialogTitle>
                <AlertDialogDescription>
                  Souhaitez-vous vraiment vous déconnecter?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Non</AlertDialogCancel>
                <Button
                  onClick={() => {
                    signOut.mutate();
                    navigate(0);
                  }}
                  disabled={signOut.isPending}
                >
                  {signOut.isPending ? "Déconnexion" : "Oui"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
