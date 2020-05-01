import { combineReducers } from "redux";
import reducer from "./productReducer";
import userReducer from "./userReducer";

export default combineReducers({
  reducer,
  userReducer,
});
