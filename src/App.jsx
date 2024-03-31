import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Chat from './Components/Chat'

function App() {
  return <>
    {/* routing for three pages and chat will be protected */}
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Signin/>} />
      <Route  path='/signup' element={<Signup/>} />
      <Route  path='/chat/:id' element={<Chat/>} />
    </Routes>
    </BrowserRouter>
  </>
}

export default App;
