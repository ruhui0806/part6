import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import App from './App';
import rootStore from './store'
// import { createStore } from 'redux';
// import { allReducers } from './reducers/index'
// import { configureStore } from '@reduxjs/toolkit';
// import noteReducer, { appendNotes, setNotes } from './reducers/noteReducer'
// import { filterReducer } from "./reducers/filterReducer";
// import noteService from "./services/noteService"

// console.log("getState via console.log: ", rootStore.getState())
// rootStore.subscribe(() => console.log("getState via subscribe ", rootStore.getState()))
// rootStore.dispatch(filterChange('IMPORTANT'))
// rootStore.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={rootStore} >
    <App />
  </Provider>
);
// const renderApp = () => {
//   root.render(

//     <React.StrictMode>
//       <App />
//     </React.StrictMode>

//   )
// }

// renderApp()
// store.subscribe(renderApp)
//   ;

//dispaly it in the console:
// const consoleState = () => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// }
// store.subscribe(consoleState)

// store.subscribe(() => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// })
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
