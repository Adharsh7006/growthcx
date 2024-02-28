// App.js
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { createContext } from 'react';
import {BrowserRouter,Route,Router, Routes} from 'react-router-dom'

const SampleContext = createContext();

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
