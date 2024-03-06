/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { FormEventHandler } from "react";
import useAuth from "../../../actions/userAction";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";
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
  const { signUp, signIn, isLoggedIn } = useAuth();

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const pseudo = formData.get("pseudo") as string;
    const password = formData.get("password") as string;

    const userData = {
      pseudo,
      password,
    };

    signIn.mutate(userData);
    // signUp.isPending
    // () => mutation.mutate()}>
    //           {mutation.isPending ? (
    //             <Loader size={12} className="mr-2" />
    //           ) : (
    //             <LogOutIcon size={12} className="mr-2" />
    //           )
    // form.reset();
    if (isLoggedIn) console.log("loggedIn yo");
  };
  const handleSignIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const pseudo = formData.get("pseudo") as string;
    const password = formData.get("password") as string;

    const userData = {
      pseudo,
      password,
    };

    signUp.mutate(userData);
    // signUp.isPending
    // () => mutation.mutate()}>
    //           {mutation.isPending ? (
    //             <Loader size={12} className="mr-2" />
    //           ) : (
    //             <LogOutIcon size={12} className="mr-2" />
    //           )
    // form.reset();
    if (isLoggedIn) console.log("loggedIn yo");
  };

  return (
    <>
      {!isLoggedIn ? (
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
            </DialogHeader>
            <Tabs defaultValue="account" className="m-w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">S'inscrire</TabsTrigger>
                <TabsTrigger value="password">Connexion</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Veuillez créer votre compte
                    </CardDescription>
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
                      <Button type="submit" disabled={signUp.isPending}>
                        {signIn.isPending ? "Connexion.." : "Se connecter"}
                      </Button>
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
                    <form onSubmit={handleSignIn}>
                      <div className="space-y-1">
                        <Label htmlFor="current">Pseudo</Label>
                        <Input id="current" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">Mot de passe</Label>
                        <Input id="new" type="password" />
                      </div>
                      <Button type="submit" disabled={signUp.isPending}>
                        {signUp.isPending ? "Connexion.." : "Se connecter"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      ) : (
        <div>Dec</div>
      )}
    </>
  );
}
