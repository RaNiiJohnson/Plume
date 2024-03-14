export function signUpErrors(err) {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect.";

  if (err.message.includes("password"))
    errors.password =
      "Essayez quelques mots au hasard. Vous n'avez pas besoin de caractères spéciaux.";

  if (err.message.includes("no-pass")) errors.password = "Votre mot de passe";

  if (err.message.includes("pseudo-exist"))
    errors.pseudo = "Ce pseudo est déjà pris.";

  return errors;
}

export function signInErrors(err) {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
}

// module.exports.uploadErrors = (err) => {
//   let errors = { format: "", maxSize: "" };

//   if (err.message.includes("invalid file"))
//     errors.format = "Format incompatabile";

//   if (err.message.includes("max size"))
//     errors.maxSize = "Le fichier dépasse 500ko";

//   return errors;
// };
