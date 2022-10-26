// import isLoggedReducer from "./isLoggeredReducer";
// import counterReducer from "./counterReducers";
import { noteReducer } from "./noteReducer";
import { filterReducer } from "./filterReducer";
import { combineReducers } from "redux";


export const allReducers = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})
//access state:
//useSelector(state => state.notes)
//useSelector(state => state.filter)

//get the corresponding state:
// const notes = useSelector(state => state.notes)

// export const allReducers = combineReducers({
//     counter: counterReducer,
//     isLogged: isLoggedReducer,
//     notes: noteReducer,
//     filter: filterReducer
// })
//combine the states together


