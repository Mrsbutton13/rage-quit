import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './NavBar.css'
// import SearchBar from '../SearchBar';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import CategoryButton from '../CategoryButton';

const NavBar = () => {
  const user = useSelector(state => state.currentUser.user)
  
  let links 
  if(user) {   
    links = 
      <>
        <ProfileButton user={user} />
      </>
  } 
  if(!user) {
    links =
        <>
          <NavLink className='profile1' exact={true} to='/login' user={user}>
            Login
            <Redirect to='/'/>
          </NavLink>
          <NavLink className='profile1' exact={true} to='/sign-up' user={user}>
            Sign Up
            <Redirect to='/'/>
          </NavLink>
        </>
  }

  return (
    <nav>
        <CategoryButton/>
      <div className='middle'>
        {/* <SearchBar /> */}
      </div>
      <div className='right-side'>
        {links}
      </div>
    </nav>
  );
}





export default NavBar;