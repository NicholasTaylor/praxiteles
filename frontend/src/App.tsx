import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  
  const [prompts, setPrompts] = useState([]);

  const allPrompts = () => {
    console.log('This started.');
    axios
      .get('http://localhost:8000/api/prompts')
      .then((res) => setPrompts(res.data))
      .catch((err) => console.log(err));
    console.log('This ended.');
  }

  useEffect(() => {
    allPrompts();
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.<br/>
          {JSON.stringify(prompts)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
