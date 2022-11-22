
import './App.css';
import React, { useEffect } from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const App = () => {
  // useEffect(() => {
  //   noteService
  //     .getAll().then(notes => dispatch(setNotes(notes)))
  // }, [dispatch])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])
  const padding = {
    padding: 5
  }
  return (
    <Router>

      <div>
        {/* <Link style={padding} to="/">home</Link> */}
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/newnotes">New notes</Link>
      </div>
      <VisibilityFilter />
      <Routes>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/newnotes" element={<NewNote />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2022</i>
      </div>



    </Router>
  )
}


export default App;
