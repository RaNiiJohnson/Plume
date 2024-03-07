/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { FormEventHandler } from "react";
import { signInFn, signUpFn } from "../../../actions/userAction";
import { userType } from "../../../utils/user.schema";
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
import { Profil } from "../users/Profil";
export function AuthButton({ post }: { post?: string }) {
  const queryClient = useQueryClient();

  const signUp = useMutation({
    mutationFn: (userData: Omit<userType, "_id">) => signUpFn(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const signIn = useMutation({
    mutationFn: (userData: Omit<userType, "_id">) => signInFn(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const isLoggedIn = !!localStorage.getItem("user");

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

    signUp.mutate(userData);
    // if (isLoggedIn) console.log("loggedIn yo");
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

    signIn.mutate(userData);
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
                        <Label htmlFor="pseudo">Pseudo</Label>
                        <Input id="pseudo" name="pseudo" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="password" type="password" />
                      </div>
                      <Button type="submit" disabled={signIn.isPending}>
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
        <Profil />
      )}
    </>
  );
}
