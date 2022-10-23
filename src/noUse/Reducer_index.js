import isLoggedReducer from "./isLoggeredReducer";
import counterReducer from "./counterReducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer
})
//combine the states together

export default allReducers
