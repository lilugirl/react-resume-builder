import { useState } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Resume from './components/Resume';
import './App.css';

function App() {
  // state holding the result
  const [result,setResult]=useState({})
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home setResult={setResult}/>}></Route>
            <Route path='/resume' element={<Resume result={result}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
