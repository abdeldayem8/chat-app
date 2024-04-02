import { useContext } from "react";
import { context } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";


export default function Protected({children}){
  const {user} =useContext(context);
  if(!user){
    return <Navigate to='/signin' replace  />
  }else{
    return children;
  }
}