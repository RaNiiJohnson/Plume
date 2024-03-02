import { Dispatch } from "@reduxjs/toolkit";
import { userType } from "../utils/user.schema";
export const GET_USER = "GET_USER";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

export const getUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    dispatch({ type: GET_USER, payload: data });
  };
};

export const useSignUp = (data: userType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER, payload: data });
  };
};

export const useLogin = (data: userType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN, payload: data });
  };
};
