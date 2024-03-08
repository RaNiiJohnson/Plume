module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect.";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe n'est pas assez fort.";

  if (err.message.includes("no-pass")) errors.password = "Votre mot de passe";

  if (err.message.includes("pseudo-exist"))
    errors.pseudo = "Ce pseudo est déjà pris.";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { pseudo: "", password: "" };

  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

// module.exports.uploadErrors = (err) => {
//   let errors = { format: "", maxSize: "" };

//   if (err.message.includes("invalid file"))
//     errors.format = "Format incompatabile";

//   if (err.message.includes("max size"))
//     errors.maxSize = "Le fichier dépasse 500ko";

//   return errors;
// };
