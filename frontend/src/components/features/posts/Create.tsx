/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Undo } from "lucide-react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { addPost } from "../../../actions/postAction";
import { getCurrentUser } from "../../../actions/userAction";
import { ContentTextArea2 } from "../../ContentTextArea2";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function CreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | undefined>();
  const [profil, setProfil] = useState("");

  //currentUer
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // create post
  const createPost = useMutation({
    mutationFn: (formData: FormData) => addPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      setProfil(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (!user) return <Navigate to="/" replace={true} />;

  const handleClick: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

    const description = formData.get("description") as string;
    const artist = formData.get("artist") as string;
    const title = formData.get("title") as string;
    const lyrics = formData.get("lyrics") as string;
    const bodyContent = new FormData();

    bodyContent.append("posterId", user._id);
    bodyContent.append("artist", artist);
    bodyContent.append("lyrics", lyrics);
    bodyContent.append("title", title);
    bodyContent.append("description", description);
    bodyContent.append("photo", file || "");

    const result = await createPost.mutateAsync(bodyContent);

    navigate(`/post/${result?._id}`);
  };

  return (
    <div>
      <Card className="h-full max-w-lg m-auto mt-10">
        <CardHeader>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleClick}>
            <div className="space-y-1">
              <Label htmlFor="lyrics">Texte</Label>
              <ContentTextArea2 required name="lyrics" placeholder="" />
              <div className="text-sm text-red-600 "></div>
            </div>
            <div className="flex gap-1">
              <div className="space-y-1">
                <Label htmlFor="artist">Artiste</Label>
                <Input required id="artist" name="artist" />
                <div className="text-sm text-red-600 "></div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="title">Titre</Label>
                <Input required id="title" name="title" type="text" />
                <div className="text-sm text-red-600 "></div>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" type="text" />
              <div className="text-sm text-red-600 "></div>
            </div>
            <div className="pb-4 space-y-1">
              <Label htmlFor="pochette">
                Pochette
                <Image
                  size={40}
                  className="block cursor-pointer text-secondary-foreground/70"
                />
              </Label>
              <input
                className="hidden"
                id="pochette"
                name="pochette"
                type="file"
                onChange={onInputChange}
                accept=".jpg, .jpeg, .png"
              />
              {profil && (
                <div className="relative">
                  <img
                    className="cursor-pointer size-[25vh] bg-cover"
                    crossOrigin="anonymous"
                    src={profil}
                  />
                  <Button
                    onClick={() => {
                      setProfil("");
                      setFile(undefined);
                    }}
                    variant={"outline"}
                    size={"icon"}
                    className="absolute -bottom-4 -left-4"
                  >
                    <Undo />
                  </Button>
                </div>
              )}

              <div className="text-sm text-red-600 "></div>
            </div>
            <Button type="submit">Poster</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
