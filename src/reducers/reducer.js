import {
  SIGNIN,
  SETQUERYSTRING,
  SETACCESSTOKEN,
  SETBOOKMARKS,
  SETPOSTS,
  SETCOMMENTS,
  SETCLOSED,
  SETREPLIED,
  SETGUIDEOPEN,
  SETWRITEOPEN,
  SETDISPLAYOPEN
} from "../actions/index";
import { initialState } from "./initialState";
import { PURGE } from "redux-persist";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE: 
      return Object.assign({}, initialState);
    case SIGNIN:
      return Object.assign({}, state, action.payload);
    case SETQUERYSTRING:
      return Object.assign({}, state, action.payload);
    case SETACCESSTOKEN:
      return Object.assign({}, state, action.payload);
    case SETBOOKMARKS:
      return Object.assign({}, state, action.payload);
    case SETPOSTS:
      return Object.assign({}, state, action.payload);
    case SETCOMMENTS:
      return Object.assign({}, state, action.payload);
    case SETCLOSED:
      return Object.assign({}, state, action.payload);
    case SETREPLIED:
      const arr = [
        ...state.repliedPosts,
        ...action.payload.repliedPosts
      ]
      return Object.assign({}, state, {
        repliedPosts: arr.filter((el, index) => arr.indexOf(el) === index)
      });
    case SETGUIDEOPEN:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default reducer;