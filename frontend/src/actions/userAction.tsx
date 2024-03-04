import { usersType } from "../utils/user.schema";

export const getUsers = async () => {
  const res = await fetch("http://localhost:5000/api/users");
  const data: usersType = await res.json();
  return data;
};
