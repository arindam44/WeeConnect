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
      // setAuthorizationHeader(res.data.token);
      saveIdTokenInLocalStorage(res.data.token);
      dispatch(getUserData(history));
      dispatch({ type: CLEAR_ERRORS });
      /* setTimeout(() => {
        history.push("/");
      }, 3000);*/
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
/*
const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
 // axios.defaults.headers.common["Authorization"] = IdToken;

 
};

const defaultOptions =(token)=> ({
  headers:{
    'Authorization':  `Bearer ${token}`
  }
});
*/

const saveIdTokenInLocalStorage = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
};
export const getUserData = (history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  fetch("/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("IdToken"),
    },
  })
    .then((res) => res.json())
    .then((user) => {
      console.log(`after /user `, user);
      dispatch({
        type: SET_USER,
        payload: user,
      });
      history.push("/");
    })
    .catch((err) => console.log(err));
};

export const signupUser = (newUserdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signUp", newUserdata)
    .then((res) => {
      //setAuthorizationHeader(res.data.token);
      saveIdTokenInLocalStorage(res.data.token);
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
  // delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadProfileImage = (formdata) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  fetch("/image", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: localStorage.IdToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  })
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
