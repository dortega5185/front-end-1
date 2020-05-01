import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions";

const initialState = {
  users: [],
  singleUser: {},
  fetchingUser: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        fetchingUser: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        singleUser: action.payload,
        fetchingUser: true,
        error: "",
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        fetchingUser: false,
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        singleUser: {
          //   ...state.singleUser.filter((item) => item.id !== action.payload),
          ...state.singleUser,
        },
        fetchingUser: true,
        error: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        fetchingUser: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
