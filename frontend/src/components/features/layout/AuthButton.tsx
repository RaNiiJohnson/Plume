/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { FormEventHandler, useState } from "react";
import { redirect } from "react-router";
import { signOutFn } from "../../../actions/userAction";
import { userDataType, userType } from "../../../utils/user.schema";
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
  const [pseudoSigninError, setPseudoSigninError] = useState("");
  const [passwordSigninError, setPasswordSigninError] = useState("");
  const [pseudoSignupError, setPseudoSignupError] = useState("");
  const [passwordSignupError, setPasswordSignupError] = useState("");
  const isLogged = !!localStorage.getItem("user");

  const queryClient = useQueryClient();

  const url: string | undefined = process.env.REACT_APP_URL;

  const signUp = useMutation({
    mutationFn: async (userData: Omit<userType, "_id">) => {
      try {
        const res = await fetch(url + "api/users/signUp", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data: userDataType = await res.json();
        if (data.errors) {
          setPseudoSignupError(data.errors.pseudo ?? "");
          setPasswordSignupError(data.errors.password ?? "");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  // export const signInFn = async (postData: Omit<userType, "_id">) => {
  //   const res = await fetch(url + "api/users/signIn", {
  //     method: "POST",
  //     body: JSON.stringify(postData),
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   });
  //   const data: userDataType = await res.json();
  //   return data;
  // };

  const signIn = useMutation({
    mutationFn: async (userData: Omit<userType, "_id">) => {
      try {
        const res = await fetch(url + "api/users/signIn", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data: userDataType = await res.json();
        if (data.errors) {
          setPseudoSigninError(data.errors.pseudo ?? "");
          setPasswordSigninError(data.errors.password ?? "");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const signOut = useMutation({
    mutationFn: signOutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      redirect("/#posts");
    },
  });

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
      {!isLogged ? (
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
                        <div className="text-sm text-red-600 ">
                          {pseudoSignupError}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="password" type="password" />
                        <div className="text-sm text-red-600 ">
                          {passwordSignupError}
                        </div>
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
                        <div className="text-sm text-red-600 ">
                          {pseudoSigninError}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="password" type="password" />
                        <div className="text-sm text-red-600 ">
                          {passwordSigninError}
                        </div>
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
        <>
          <Profil signOut={signOut} />
        </>
      )}
    </>
  );
}
