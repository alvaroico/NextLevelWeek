import React from 'react';
import './App.css';
import { Roboto_400Regular, Roboto_500Medium} from   '@expo-google-fonts/ubuntu';
import {Ubuntu_700Bold, useFonts } from  '@expo-google-fonts/roboto';

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