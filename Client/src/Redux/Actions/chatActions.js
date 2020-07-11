import { SET_ONLINE_USERS } from "../Types";

import axios from "axios";

export const getAllUserNames = () => (dispatch) => {
  axios
    .get("/users", {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: SET_ONLINE_USERS, payload: res.data });
    })
    .catch((err) => console.log(err));
};
