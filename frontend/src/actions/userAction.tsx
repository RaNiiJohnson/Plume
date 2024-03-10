import axios from "axios";
import { redirect } from "react-router";
import { userType, usersType } from "../utils/user.schema";

const url: string | undefined = process.env.REACT_APP_URL;

// get users function
export const getUsers = async () => {
  const res = await fetch(url + "api/users");
  const data: Omit<usersType, "password"> = await res.json();

  return data;
};

// get user function
export const getUser = async (userId?: string) => {
  const res = await fetch(url + "api/users/" + userId);
  const data: userType = await res.json();

  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch(url + "api/users");

  const dataUsers: usersType = await res.json();
  const dataItems = localStorage.getItem("user") as string;
  const data = JSON.parse(dataItems);
  const currentUser = dataUsers.find((user) => user._id === data._id);
  if (!currentUser) return null;
  return currentUser;
};

//upload picture
export const uploadFn = async (formData: FormData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  try {
    const res = await axios.post(url + "api/users/upload", formData, config);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// sign out function
export const signOutFn = async () => {
  try {
    localStorage.removeItem("user");
    return redirect("/");
  } catch (error) {
    console.log(error);
  }
};
