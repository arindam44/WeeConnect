import { SET_ONLINE_USERS } from "../Types";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return { ...state };
  }
}
