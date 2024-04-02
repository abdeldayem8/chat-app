import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const context = createContext();
export function AuthContext({children}){
 const auth =getAuth();
 const [user,setUser]=useState();
 const [loading,setLoading]=useState(true);
 useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
    setLoading(false);
    if(currentuser){
        setUser(currentuser);
    }else{
        setUser(null)
    }
   })
   return ()=>{
    if(unsubscribe)unsubscribe();
   }
 },[])
 const values={
    user:user,
    setUser:setUser,
 }
 return <context.Provider value={values}>
    {!loading && children}
 </context.Provider>
}