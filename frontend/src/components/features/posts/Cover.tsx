import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import clsx from "clsx";
import { Check, ImageUp, Undo } from "lucide-react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { uploadPochetteFn } from "../../../actions/postAction";
import { PostType, PostUpdateSchemaType } from "../../../utils/post.schema";
import { userType } from "../../../utils/user.schema";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import { Button, buttonVariants } from "../../ui/button";
import { Label } from "../../ui/label";

type CoverType = {
  user: userType | undefined | null;
  post: PostType;
  id: string;
  poster:
    | {
        _id: string;
        pseudo: string;
        picture?: string | undefined;
      }
    | undefined;
  updatePost: UseMutationResult<
    unknown,
    Error,
    {
      postData: PostUpdateSchemaType;
      postId: string;
    },
    unknown
  >;
};

export default function Cover({
  user,
  post,
  id,
  poster,
  updatePost,
}: CoverType) {
  const [file, setFile] = useState<File>();
  const [picture, setPicture] = useState("");

  const queryClient = useQueryClient();

  const uploadPochette = useMutation({
    mutationFn: (FormData: FormData) => uploadPochetteFn(FormData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePicture: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (file && user) {
      const formData = new FormData();
      formData.append("id", post._id);
      formData.append("photo", file);

      try {
        uploadPochette.mutate(formData);
        setPicture("");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      console.log("No file or user");
    }
  };
  return (
    <div className="overflow group">
      <form onSubmit={handlePicture} className="relative">
        <div className="overflow-hidden">
          <CardContainer className="inter-var">
            <CardBody className=" group/card">
              <CardItem translateZ="100" className="w-full ">
                <input
                  className="hidden"
                  type="file"
                  name="pochette"
                  onChange={onInputChange}
                  id="pochette"
                  accept=".jpg, .jpeg, .png"
                />
                <Label
                  htmlFor={user && user?._id === poster?._id ? "pochette" : ""}
                >
                  <img
                    crossOrigin="anonymous"
                    src={picture ? picture : post.pochette}
                    alt="pochette"
                    className={clsx(
                      " size-[32vw] object-cover max-w-60 max-h-60 group-hover/card:shadow-xl",
                      {
                        "cursor-pointer": user && user?._id === poster?._id,
                      }
                    )}
                  />
                </Label>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        {!picture && user && user?._id === poster?._id && (
          <Label htmlFor="pochette">
            <div
              className={clsx(
                buttonVariants({ variant: "outline", size: "icon" }),
                "absolute right-0 invisible -bottom-5 group-hover:visible cursor-pointer mix-blend-exclusion"
              )}
            >
              <ImageUp />
            </div>
          </Label>
        )}
        {picture && (
          <div className="mix-blend-lighten">
            <Button
              disabled={updatePost.isPending}
              variant={"outline"}
              size={"icon"}
              type="submit"
              className="absolute right-0 -bottom-5"
            >
              <Check />
            </Button>
            <Button
              onClick={() => setPicture("")}
              variant={"outline"}
              size={"icon"}
              className="absolute left-0 -bottom-5"
            >
              <Undo />
            </Button>
          </div>
        )}
      </form>
      <img />
    </div>
  );
}
