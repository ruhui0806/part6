
import './App.css';

import React from 'react';

//npm install react-redux firstly
import { useSelector, useDispatch } from 'react-redux'
import { Increment, Decrement, SignIn, SignOut } from './actions'

function App() {
  const counter = useSelector(state => state.counter)
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <header className="App-header">

        <h1>Counter:  {counter} </h1>
        <button onClick={() => dispatch(Increment)}> + </button>
        <button onClick={() => dispatch(Decrement)}> - </button>
        <button onClick={() => dispatch(SignIn)}> Log in </button>
        <button onClick={() => dispatch(SignOut)}> Log out </button>
        <h1>Log in status: {isLogged ? "logged in" : "not log in yet"} </h1>
      </header>
    </div>
  );
}

export default App;
