
import './App.css';
import React, { useEffect } from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import noteService from './services/noteService';
import { setNotes } from './reducers/noteReducer';


//App component--> should move to the file App.js

// noteService.getAll().then(notes => notes.forEach(note => { rootStore.dispatch(appendNotes(note)) }))

// noteService.getAll().then(notes => rootStore.dispatch(setNotes(notes)))

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}


export default App;
