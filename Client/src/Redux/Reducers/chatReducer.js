import {
  SET_ONLINE_USERS,
  SET_THREADS,
  SET_CHAT,
  SEND_MESSEGE,
  UPDATE_THREADS,
  NEW_MESSEGE,
} from "../Types";

const initialState = {
  users: [],
  threads: [],
  thread: {},
  chat: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_THREADS:
      console.log(action.payload);
      return {
        ...state,
        threads: action.payload,
      };
    case SET_CHAT:
      state.thread.users = action.payload.users;
      state.thread.imageUrls = action.payload.imageUrls;
      state.chat = action.payload.chats;
      return {
        ...state,
      };
    case SEND_MESSEGE:
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    case NEW_MESSEGE:
      if (Object.keys(state.chat).length > 0) {
        if (state.thread.users[0] === action.payload.sender) {
          console.log("inside");
          state.chat = [...state.chat, action.payload];
        }
      }
      return {
        ...state,
      };
    case UPDATE_THREADS:
      console.log(action.payload);
      state.threads = action.payload;
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}
