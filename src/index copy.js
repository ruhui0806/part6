// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
// // import { render } from '@testing-library/react';

// // const CounterReducer = (action, state = 0) => {
// //   switch (action.type) {
// //     case 'Increase':
// //       return state + 1
// //     case 'Decrease':
// //       return state - 1
// //     case 'ZERO':
// //       return 0
// //     default:
// //       return state
// //   }
// // }

// // const store = createStore(CounterReducer)
// // console.log(store.getState())

// // const App = () => {
// //   return (
// //     <>
// //       <>
// //         {/* App renders the value of the counter by asking it from the store with the method store.getState() */}
// //         {store.getState()}
// //       </>
// //       <button onClick={e => store.dispatch({ type: 'Increase' })} >plus</button>
// //       <button onClick={e => store.dispatch({ type: 'Decrease' })} >minus</button>
// //       <button onClick={e => store.dispatch({ type: 'ZERO' })} >zero</button>
// //     </>
// //   )
// // }


// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW NOTE':
//       return state.concat(action.data)
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.data.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = { ...noteToChange, important: !noteToChange.important }
//       return state.map(note => note.id !== id ? note : changedNote)
//     }
//     default:
//       return state
//   }
// }

// const store = createStore(noteReducer)

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

// const App = () => {
//   return (
//     <div>
//       <ul>
//         {store.getState().map(note =>
//           <li key={note.id}>
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'


// Action -> e.g., INCREMENT: an action that returns an obj {type:}
const actionIncrement = () => {
  return { type: "Increment" }
}

const actionDecrement = () => {
  return { type: "Decrement" }
}

//REDUCER -> definde how a certain action changes the state:take 2 params: current state, action
const ReducerCounter = (state = 0, action) => {
  switch (action.type) {
    case "Increment": return state + 1;
    case "Decrement": return state - 1;
  }
}

//Store -> Globalized state: pass in a reducer
const store = createStore(ReducerCounter)

//dispaly it in the console:
// const consoleState = () => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// }
// store.subscribe(consoleState)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

//DISPATCH
store.dispatch(actionIncrement())
store.dispatch(actionIncrement())
store.dispatch(actionIncrement())
store.dispatch(actionIncrement())


const root = ReactDOM.createRoot(document.getElementById('root'));
// const renderApp = () => root.render(<App />)
// renderApp()
// StorageEvent.subscribe(renderApp)


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
