import { userDataType, userType, usersType } from "../utils/user.schema";

const url: string | undefined = process.env.REACT_APP_URL;

// get users function
export const getUsers = async () => {
  const res = await fetch(url + "api/users");
  const data: usersType = await res.json();

  return data;
};

// get user function
export const getUser = async (userId: string) => {
  const res = await fetch(url + "api/users/" + userId);
  const data: userType = await res.json();

  return data;
};
export const getCurrentUser = async () => {
  const dataString = localStorage.getItem("user");
  let data: userDataType | null = null;

  if (dataString) {
    try {
      data = JSON.parse(dataString);
    } catch (error) {
      console.error(error);
    }
  }

  return data;
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

// sign out function
export const signOutFn = async () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
