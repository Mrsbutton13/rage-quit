import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { logout, setCurrentUser } from "../../store/currentUser";
import '../NavBar/NavBar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());
    
  };

  return  <button className='logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
