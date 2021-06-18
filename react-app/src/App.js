import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import SplashPage from "./components/SplashPage";
import Profile from "./components/Profile";
import { setCurrentUser } from './store/currentUser'
import { useDispatch, useSelector } from 'react-redux'
import GamePage from "./components/GamePage";
import Category from "./components/Category";

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async() => {
      await dispatch(setCurrentUser())
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/users" exact={true} >
          <UsersList/>
        </Route>
        <Route path="/users/:userId" exact={true} >
          <User />
        </Route>
        <Route path="/" exact={true} >
          <SplashPage/>
        </Route>
        <Route path='/profile' exact={true} >
          <Profile/>
        </Route>
        <Route path='/games/:gameId'>
          <GamePage/>
        </Route>
        <Route path='/category/:id' exact={true} >
          <Category />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
