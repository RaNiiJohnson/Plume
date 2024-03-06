import { useMutation } from "@tanstack/react-query";
import { userDataType, userType, usersType } from "../utils/user.schema";

const url: string | undefined = process.env.REACT_APP_URL;

// get user function
export const getUsers = async () => {
  const res = await fetch(url + "api/users");
  const data: usersType = await res.json();

  return data;
};

// sign up function
export const signUpFn = async (postData: Omit<userType, "_id">) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/signUp", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data: userDataType = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

// sign in function
export const signInFn = async (postData: Omit<userType, "_id">) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/signIn", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data: userDataType = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

// sign out function
export const signOutFn = async () => {
  try {
    await fetch("http://localhost:5000/api/users/signOut", {
      method: "POST",
    });
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};

// custom hook for authentication

const useAuth = () => {
  const signUp = useMutation({
    mutationFn: (userData: Omit<userType, "_id">) => signUpFn(userData),
  });

  const signIn = useMutation({
    mutationFn: (userData: Omit<userType, "_id">) => signInFn(userData),
  });

  const signOut = useMutation({
    mutationFn: signOutFn,
  });

  const isLoggedIn = !!localStorage.getItem("user");

  return { signUp, signIn, signOut, isLoggedIn };
};

export default useAuth;
