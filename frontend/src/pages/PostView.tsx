import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import colorThief from "colorthief";
import { Check, Edit3, MessageCircle, Undo } from "lucide-react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useParams } from "react-router";
import {
  CommentType,
  commentPostFn,
  getPost,
  likePostFn,
  updatePostFn,
  uploadPochetteFn,
} from "../actions/postAction";
import { getCurrentUser, getUsers } from "../actions/userAction";
import { ContentTextArea } from "../components/ContentTextArea";
import { ContentTextArea2 } from "../components/ContentTextArea2";
import { AuthButton } from "../components/features/layout/AuthButton";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { dateParser } from "../utils/date";
import { PostUpdateSchemaType } from "../utils/post.schema";

export default function PostView() {
  const [textEdit, setTextEdit] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [lyricsData, setLyrics] = useState("");
  const [plumeData, setData] = useState(false);
  const [file, setFile] = useState<File>();
  const [picture, setPicture] = useState("");

  const { id } = useParams();

  const {
    data: post,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Post", id],
    queryFn: () => getPost(String(id)),
    enabled: id !== undefined,
  });

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const likePost = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      likePostFn(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
    },
  });

  const commentPost = useMutation({
    mutationFn: ({
      commentData,
      postId,
    }: {
      commentData: CommentType;
      postId: string;
    }) => commentPostFn(commentData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
    },
  });

  const updatePost = useMutation({
    mutationFn: ({
      postData,
      postId,
    }: {
      postData: PostUpdateSchemaType;
      postId: string;
    }) => updatePostFn(postData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
      setTextEdit(false);
    },
  });

  const uploadPochette = useMutation({
    mutationFn: (FormData: FormData) => uploadPochetteFn(FormData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post", id] });
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });

  const imageUrl = post?.pochette;
  const thief = new colorThief();

  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = imageUrl as string;

  image.onload = () => {
    const dominantColor = thief.getColor(image);
    const result = thief.getPalette(image);
    const rgbColor = `rgb(${dominantColor.join(",")})`;
    const rgbColorPrime = `rgb(${result[result.length - 1].join(",")})`;
    // console.log(rgbColor);
    // console.log(rgbColorPrime);
    setBackgroundColor(rgbColorPrime);
    setBgColor(rgbColor);
  };
  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  if (!post) return <div>No post found</div>;

  const poster = users?.find((u) => u._id === post.posterId);

  const lyrics = post.lyrics.split("\n\n");

  const text = lyrics?.map((lines, index) => (
    <div key={index} className="font-victor">
      {lines.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
      <br />
    </div>
  ));

  if (!id) return <>no id</>;
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePicture: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (file && user) {
      const formData = new FormData();
      formData.append("id", user._id);
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const commentData = new FormData(form);
    const text = commentData.get("comment") as string;

    if (user) {
      const commentData = {
        commenterId: user._id,
        name: user.pseudo,
        text,
      };

      commentPost.mutate({ commentData, postId: id });
      form.reset();
    } else console.log("no user");
  };

  const handleDataSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const description = formData.get("description") as string;

    if (user) {
      const postData = {
        posterId: user._id,
        title,
        artist,
        description,
      };

      updatePost.mutate({ postData, postId: post._id });
      setData(false);
    }
  };

  const handleText: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (user) {
      const postData = {
        posterId: user._id,
        lyrics: lyricsData,
      };

      updatePost.mutate({ postData, postId: id });
    }
  };

  return (
    <>
      <div
        className="z-10 w-full "
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${backgroundColor})`,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-10 m-auto max-w-7xl group">
          <div className="relative text-white mix-blend-hard-light ">
            {!plumeData && (
              <>
                <div className="flex items-center justify-between gap-4 text-2xl font-semibold ">
                  {post.title}
                  {user && (
                    <Edit3
                      className="hidden text-primary group-hover:block"
                      onClick={() => setData(!plumeData)}
                    />
                  )}
                </div>

                <div>{post.artist}</div>
                <div className="max-w-sm mt-2 text-sm text-white/40">
                  {post.description}
                </div>
              </>
            )}
            {plumeData && (
              <form className="space-y-2" onSubmit={handleDataSubmit}>
                <Input
                  defaultValue={post.title}
                  placeholder={post.title}
                  className="placeholder:text-foreground/40"
                  name="title"
                  autoFocus
                />
                <Input
                  defaultValue={post.artist}
                  placeholder={post.artist}
                  className="placeholder:text-foreground/40"
                  name="artist"
                />
                <Input
                  defaultValue={post.description}
                  placeholder={post.description}
                  className="placeholder:text-foreground/40"
                  name="description"
                />
                <div>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => setData(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    size={"sm"}
                    style={{
                      background: `${bgColor}`,
                    }}
                    type="submit"
                  >
                    <span className="mix-blend-difference">Confirmer</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
          <div className="overflow-hidden">
            <form onSubmit={handlePicture}>
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
                    <Label htmlFor="pochette">
                      <img
                        crossOrigin="anonymous"
                        src={picture ? picture : post.pochette}
                        alt="pochette"
                        className=" size-[30vw] object-cover max-w-60 max-h-60 group-hover/card:shadow-xl"
                      />
                    </Label>
                  </CardItem>
                </CardBody>
              </CardContainer>{" "}
              {picture && (
                <>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    type="submit"
                    className=" -bottom-4 -right-4"
                  >
                    <Check />
                  </Button>
                  <Button
                    onClick={() => setPicture("")}
                    variant={"outline"}
                    size={"icon"}
                    className=" -bottom-4 -left-4"
                  >
                    <Undo />
                  </Button>
                </>
              )}
            </form>
            <img />
          </div>
        </div>
      </div>
      <div className="max-w-3xl p-2 m-auto prose divide-y-2 dark:prose-invert">
        <div className="px-2 border-l-2">
          {!textEdit ? (
            <>{text}</>
          ) : (
            <ContentTextArea
              className="my-2 text-sm font-victor"
              defaultValue={post.lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              autoFocus
            />
          )}
          <div className="flex items-center justify-between gap-2 text-sm text-secondary-foreground/45">
            <div className="flex items-center gap-2 text-secondary-foreground">
              <div className="flex items-center gap-0.5">
                <HeartFilledIcon
                  className={clsx("transition cursor-pointer ", {
                    "text-primary ": user && post.likers.includes(user?._id),
                    "text-secondary-foreground":
                      (user && !post.likers.includes(user?._id)) || !user,
                  })}
                  onClick={() => {
                    user
                      ? likePost.mutate({ postId: post._id, userId: user._id })
                      : console.log("no user");
                  }}
                />
                <span>{post.likers.length}</span>
              </div>
              {" ‧ "}
              <div className="flex items-center gap-1 text-secondary-foreground">
                <Label htmlFor="comment" className="cursor-pointer">
                  <MessageCircle size={15} />
                </Label>
                {post.comments.length}
              </div>

              {user && user?._id === poster?._id && (
                <>
                  <div>
                    <Button
                      variant={"link"}
                      size={"icon"}
                      className="ml-4 text-secondary-foreground/80"
                      onClick={() => setTextEdit(!textEdit)}
                    >
                      {!textEdit ? "Modifier" : "Annuler"}
                    </Button>
                  </div>
                  <form onSubmit={handleText}>
                    {textEdit && (
                      <Button
                        style={{
                          background: `${bgColor}`,
                        }}
                        className="mx-2"
                        size={"sm"}
                      >
                        <span className="mix-blend-difference">Confirmer</span>
                      </Button>
                    )}
                  </form>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div>{dateParser(post.createdAt)}</div>
              {" ‧ "}
              <div className="text-primary"> {poster?.pseudo}</div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-1 sm:flex-row"
          >
            <ContentTextArea2
              disabled={!user}
              required
              id="comment"
              placeholder="Votre commentaire..."
              name="comment"
            />
            {user && (
              <Button
                disabled={commentPost.isPending}
                type="submit"
                size={"sm"}
                style={{
                  background: `${bgColor}`,
                }}
              >
                <span className="mix-blend-difference">Commenter</span>
              </Button>
            )}
          </form>
          <div className="space-y-2">
            {post.comments
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((comment) => (
                <div key={comment._id} className="p-2 text-sm bg-secondary">
                  <div className="font-bold">{comment.commenterPseudo}</div>
                  <div className="text-secondary-foreground/65">
                    {comment.text}
                  </div>
                </div>
              ))}
            {post.comments.length < 1 && !!user && (
              <div>Commenter en premier</div>
            )}
          </div>
          {post.comments.length < 1 && !user && (
            <div>
              Veuillez vous <AuthButton flag={true} /> pour commenter en premier
            </div>
          )}
        </div>
      </div>
    </>
  );
}
