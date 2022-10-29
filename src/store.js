import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './reducers/noteReducer'
import { filterReducer } from "./reducers/filterReducer";

const rootStore = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})
export default rootStore
// const rootStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
