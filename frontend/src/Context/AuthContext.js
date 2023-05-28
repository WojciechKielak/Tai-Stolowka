import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({ children }) => {
  
  let [user, setUser] = useState(()=>localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null);
  let [tokens, setTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);

  const navigate = useNavigate()

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
    });
    let data = await response.json();
    if(response.status === 200){
        setTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('tokens', JSON.stringify(data));
        navigate('/')
      }else{
        alert("Cos poszlo nie tak")
      }
  };

  let logout = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('tokens')
    navigate('/login')
  }

 /*  let updateToken = async ()=>{
    let response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'refresh': tokens.refresh})
    });
    let data = await response.json();

    if (response.status == 200){
      setTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('tokens', JSON.stringify(data));
    }else{
      alert("Cos poszlo nie tak z tokenem")
      logout()
    }
  } */

  let contextData = {
    user:user,
    loginUser: loginUser,
    logout:logout
  };
  /* 
    useEffect(() => {

    }, [tokens, loading])
 */
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

