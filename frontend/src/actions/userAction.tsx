import axios from "axios";
import { userDataType, userType, usersType } from "../utils/user.schema";

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

  if (res.ok) {
    const dataUsers: usersType = await res.json();

    const dataItems = localStorage.getItem("user") as string;

    if (dataItems) {
      try {
        const data = JSON.parse(dataItems);
        const currentUser = dataUsers.find((user) => user._id === data._id);
        console.log(currentUser);
        return currentUser || null;
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    return null; // Return null if the fetch request fails
  }
};

// sign up function
export const signUpFn = async (postData: Omit<userType, "_id">) => {
  try {
    const res = await fetch(url + "api/users/signUp", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data: userDataType = await res.json();
      console.log(data, res);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } else console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// sign in function
export const signInFn = async (postData: Omit<userType, "_id">) => {
  try {
    const res = await fetch(url + "api/users/signIn", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data: userDataType = await res.json();
      console.log(data, res);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } else console.log(res);
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
};
