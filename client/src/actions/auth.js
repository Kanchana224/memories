// auth.js

import * as api from "../api";
import { AUTH } from "./../constants/actionTypes";

export const signin = (formData, callback) => async (dispatch) => {
  try {
    // login the user ...
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    
    // Call the callback function if provided
    if (callback) callback();

  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, callback) => async (dispatch) => {
  try {
    // signup the user ...
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    
    // Call the callback function if provided
    if (callback) callback();

  } catch (error) {
    console.log(error);
  }
};
