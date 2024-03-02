/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { PostType } from "../utils/post.schema";
import { userType } from "../utils/user.schema";

export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";

export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("http://localhost:5000/api/posts/", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = res.json();
      dispatch({ type: GET_POST, payload: data });
    } catch (error) {
      return console.log(error);
    }
  };
};

export const addPost = (data: PostType) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post("http://localhost:5000/api/postscreate-post/", data);
      dispatch({ type: ADD_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const likePost = (postId: PostType["_id"], userId: userType["_id"]) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:5000/api/posts/like-post/" + postId,
        data: { id: userId },
      });
      dispatch({ type: LIKE_POST, payload: { postId, userId } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (postId: PostType["_id"]) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:5000/api/posts/delete-post/" + postId,
      });
      dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.log(error);
    }
  };
};
