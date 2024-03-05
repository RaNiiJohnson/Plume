import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FormEventHandler } from "react";
import { signUp } from "../../../actions/userAction";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

export function AuthButton({ post }: { post?: string }) {
  const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await signUp(formData);

    return result;
  };

  const { data, error, isError } = useQuery({
    queryKey: ["signUp user"],
    queryFn: () => handleSignUp,
  });

  // const { data: dataUser, isError: userError } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: getUsers,
  // });

  if (error || isError) console.log(error, isError);

  if (data) console.log(data);
  // const {data}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className={clsx({
            "mix-blend-exclusion text-white": post,
          })}
        >
          Connexion
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] ">
        <DialogHeader>
          <DialogTitle className="text-lg font-protest text-primary">
            Plume
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Tabs defaultValue="account" className="m-w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">S'inscrire</TabsTrigger>
            <TabsTrigger value="password">Connexion</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardDescription>Veuillez créer votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleSignUp}>
                  <div className="space-y-1">
                    <Label htmlFor="pseudo">Pseudo</Label>
                    <Input id="pseudo" name="pseudo" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" name="password" type="password" />
                  </div>
                  <Button type="submit">Se connecter</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardDescription>Content de vous revoir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Pseudo</Label>
                  <Input id="current" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Mot de passe</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Se connecter</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
