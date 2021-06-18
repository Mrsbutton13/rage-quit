import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, setCurrentUser } from "../../store/currentUser";
import './Login.css'
import background from '../../images/background.png'


const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login({email, password}));
    await dispatch((setCurrentUser()))
  };
  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  
  if(user) {
    return <Redirect to='/'/>
  }
  
  
  return (
    <div className='login-page'>
      <img className='login-img' src={background} />
      <form className='login-form' onSubmit={onLogin}>
      <div className='account'>Login</div>
      <div>
      {errors.map((error) => (
        <div>{error}</div>
        ))}
        </div>
        <div className='email-div'>
        <label className='email' htmlFor="email">Email</label>
        <input
        className='email-input'
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={updateEmail}
        />
        </div>
        <div className='password-div'>
        <label className='password' htmlFor="password">Password</label>
        <input
        className='password-input'
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={updatePassword}
        />
        </div>
        <button className='submit' type="submit">
          Login</button>
        </form>
        </div>
  );
};

export default LoginForm;
