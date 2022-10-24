
import './App.css';

import React from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';

//App component--> should move to the file App.js
const App = () => {

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}


export default App;
