import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login, setCurrentUser, signUp } from '../../store/currentUser';
import background from '../../images/background.png'
import './Login.css'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")
  const [gamertag, setGamertag] = useState("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword && username && email) {
      const user = await dispatch(signUp({username, email, bio, avatar, gamertag, password}));
      await dispatch(setCurrentUser())
      await dispatch(login(user))
    } else if(password === repeatPassword && username) {
      return setErrors('Please provide an email') 
    } else if (password === repeatPassword && email) {
      return setErrors('Please provide a username')
    } else {
      return setErrors('Passwords must match')
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value)
  }

  const updateAvatar = (e) => {
    const img = e.target.files[0]
    setAvatar(img)
  }

  const updateGamertag = (e) => {
    setGamertag(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className='login-page'>
    <img className='login-img' src={background} />
    <form  className='login-form' onSubmit={onSignUp}>
      {errors && (
      <>
      <div className='errors'>{errors}</div>
      </>
        )}
       <div className='account'>Signup</div>
      <div className='email-div'>
        <label className='email' >User Name</label>
        <input
        className='email-input'
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          ></input>
      </div>
      <div className='email-div'>
        <label className='email' >Email</label>
        <input
        className='email-input'
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          ></input>
      </div>
      <div className='email-div'>
        <label className='email' >Gamertag</label>
        <input
        className='email-input'
          type="text"
          name="gamertag"
          onChange={updateGamertag}
          value={gamertag}
          ></input>
      </div>
      <div className='email-div'>
        <label className='email' >Bio</label>
        <textarea
        className='email-input'
          type="text"
          name="bio"
          onChange={updateBio}
          value={bio}
          ></textarea>
      </div>
      <div className='email-div'>
        <label className='email' >Personalize with an avatar</label>
        <input
        className='email-input'
          type="file"
          name="avatar"
          accept="image/*"
          onChange={updateAvatar}
          ></input>
      </div>
      <div className='email-div'>
        <label className='email' >Password</label>
        <input
        className='email-input'
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          ></input>
      </div>
      <div className='email-div'>
        <label className='email' >Repeat Password</label>
        <input
        className='email-input'
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
      </div>
      <button className='submit' type="submit">Sign Up</button>
    </form>
    </div>
  </>
  );
};

export default SignUpForm;
