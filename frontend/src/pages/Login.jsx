import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Login from "../components/Login/Login.jsx"
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  return (
    <div>
        <Login></Login>
    </div>
  )
}

export default LoginPage