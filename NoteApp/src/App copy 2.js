
import './App.css';

import React from 'react';

//npm install react-redux firstly
import { useSelector, useDispatch } from 'react-redux'
import { createNote, toggleImportanceOf } from './actions'

//App component--> should move to the file App.js
const App = () => {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    // use the user's input value as the note's content
    const content = event.target.note.value
    //create new note:
    event.target.note.value = ""
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }


  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}
// function App() {
//   const counter = useSelector(state => state.counter)
//   const isLogged = useSelector(state => state.isLogged)
//   const dispatch = useDispatch()
//   return (
//     <div className="App">
//       <header className="App-header">

//         <h1>Counter:  {counter} </h1>
//         <button onClick={() => dispatch(Increment)}> + </button>
//         <button onClick={() => dispatch(Decrement)}> - </button>
//         <button onClick={() => dispatch(SignIn)}> Log in </button>
//         <button onClick={() => dispatch(SignOut)}> Log out </button>
//         <h1>Log in status: {isLogged ? "logged in" : "not log in yet"} </h1>
//       </header>
//     </div>
//   );
// }

export default App;
