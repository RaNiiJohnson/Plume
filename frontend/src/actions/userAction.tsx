import axios from "axios";
import { usersType } from "../utils/user.schema";

const url: string | undefined = process.env.REACT_APP_URL;

export const getUsers = async () => {
  const res = await fetch(url + "api/users");
  const data: usersType = await res.json();

  return data;
};

export const fetchToken = async () => {
  const res = await fetch(url + "jwtId");
  const data: string = await res.json();

  return data;
};

export const signUp = async (formData: FormData) => {
  const pseudo = formData.get("pseudo");
  const password = formData.get("password");
  await axios({
    method: "post",
    url: url + "api/users/singUp",
    data: { pseudo, password },
  });
};
