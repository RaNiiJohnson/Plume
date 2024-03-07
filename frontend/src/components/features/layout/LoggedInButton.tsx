/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutFn } from "../../../actions/userAction";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";

export function LoggedInButton() {
  const queryClient = useQueryClient();
  const signOut = useMutation({
    mutationFn: signOutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return (
    <>
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
              onClick={() => signOut.mutate()}
              disabled={signOut.isPending}
            >
              {signOut.isPending ? "Déconnexion" : "Oui"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
