import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Chat from './Components/Chat'
import Protected from './protected';
import { AuthContext } from './Context/AuthContext';




function App() {
  
  
  const router =createBrowserRouter([
    {path:'/',element:<Signin/>},
    {path:'/signin',element:<Signin/>},
    {path:'/signup',element:<Signup/>},
    {path:'/chat/:id/*' , element:<Protected><Chat/></Protected>}

  ])
  return <>
  <AuthContext>
   <RouterProvider  router={router} />
   </AuthContext>
  </>
}

export default App;
