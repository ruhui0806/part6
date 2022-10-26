import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import App from './App';
import { allReducers } from './reducers/index'
import { createNote } from './reducers/noteReducer'; //action
import { filterChange } from './reducers/filterReducer'; //action

//move noteReducer to its own component
// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       return state.concat(action.data)
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.data.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote
//       )
//     }
//     default:
//       return state
//   }
// }


const rootStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log("getState via console.log: ", rootStore.getState())
rootStore.subscribe(() => console.log("getState via subscribe ", rootStore.getState()))
rootStore.dispatch(filterChange('IMPORTANT'))
rootStore.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

// index part, remain here:
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={rootStore} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
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
