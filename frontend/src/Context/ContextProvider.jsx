import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext=createContext();
export default function ContextProvider({children}) {
    
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
         
        const verify= async ()=>{
         
            const token=localStorage.getItem('token');
            if(!token)
            {
             setLoading(false);
             return;
            }
            axios.get('http://localhost:5000/api/auth/me',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res)=>setUser(res.data.user))
            .catch(()=>
            {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(()=>
            {
              setLoading(false);
            })
        }
        verify();
},[])
const logout=()=>{
    localStorage.removeItem('token');
    setUser(null);
}
  return (
    
      <AuthContext.Provider value={{user,setUser,loading,logout}}>
           {children}
      </AuthContext.Provider>
  
  )
}

export const Auth=()=>useContext(AuthContext);