import React from 'react';
import './App.css';

import Routes from './routes'

function App() {
  return (
   <Routes />
  );
}

export default App;




/**
 * import React, { useState } from 'react';
import './App.css';
import Header from './Header';


function App() {
  const [counter, setCounter] = useState(0);

  function handleButtonClick(){
    setCounter(counter + 1)
  }

  return (
    <div>
      <Header title={`Contador: ${counter}`} ></Header>
      <h1>{counter}</h1>
      <button type="button" onClick={handleButtonClick} >Aumentar</button>
    </div>
  );
}

export default App;
 */