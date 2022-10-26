
import './App.css';

import React from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

//App component--> should move to the file App.js
const App = () => {


  return (
    <div>
      <NewNote />
      {/* <div>
        all<input type="radio" name="filter" onChange={() => filterSelected('ALL')} />
        important <input type="radio" name="filter" onChange={() => filterSelected('IMPORTANT')} />
        non-important <input type="radio" name="filter" onChange={() => filterSelected('NONIMPORTANT')} />
      </div> */}
      <VisibilityFilter />
      <Notes />
    </div>
  )
}


export default App;
