import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from "../Types";
import axios from "axios";

export const loginUser = (userdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signIn", userdata)
    .then((res) => {
      //setAuthorizationHeader(res.data.token);
      dispatch(getUserData(res.data.token));
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log("calling set_user");
  fetch("/user", {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((user) => {
      console.log(user);
      dispatch({
        type: SET_USER,
        payload: user,
      });
    })
    .catch((err) => console.log(err));
};

export const signupUser = (newUserdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signUp", newUserdata)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};

export const uploadProfileImage = (formdata) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/image", formdata)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
