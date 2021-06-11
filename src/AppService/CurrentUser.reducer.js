import {
  FETCH_CURRENT_USER_FAILED,
  FETCH_CURRENT_USER_REQUESTED,
  FETCH_CURRENT_USER_UPDATED,
  FETCH_CURRENT_USER_ADDED,
  FETCH_CURRENT_USER_NOT_FOUND
} from "./CurrentUser.actions";

const INITIAL_STATE = {
  user: {
    displayName: "User",
    photoUrl: "/static/images/avatar/1.jpg",
    email: "",
    uid: ""
  },
  errorGettingUser: null,
  isGettingUser: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUESTED:
      return {
        ...state,
        isGettingUser: true,
      };

    case FETCH_CURRENT_USER_UPDATED:
      return {
        ...state,
        user: {...action.payload},
        isGettingUser: false,
      };

    case FETCH_CURRENT_USER_FAILED:
      return {
        ...state,
        errorGettingUser: action.payload,
        isGettingUser: false,
      };

      case FETCH_CURRENT_USER_NOT_FOUND:
      return {
        ...state,
        isGettingUser: false,
      };

    case FETCH_CURRENT_USER_ADDED:
      return {
        ...state,
        user: {...action.payload} 
      };

    default:
      return state;
  }
};

export default reducer;