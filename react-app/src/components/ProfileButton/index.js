import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/currentUser'
import '../NavBar/NavBar.css'


function ProfileButton({user}) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const history = useHistory()

  const openMenu = () => {
    if(showMenu) return 
    setShowMenu(true)
  }

  useEffect(() => {
    if(!showMenu) return 

    const closeMenu = () => {
      setShowMenu(false) 
    }

    document.addEventListener('click', closeMenu) 

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const toProfile = () => {
    history.push('/profile')
  }

  const logout = (e) => {
    e.preventDefault()
    history.push('/')
    dispatch(sessionActions.logout())
  }

  const discover = () => {
    let users = '/users'
    history.push(users)
  }


  return (
    <>
    <button className='user-button' onClick={openMenu}>
      <img className='user' src={user?.avatar} />
    </button>
    {showMenu && (
      <>
      <div className='profile-position'>
      <div className='profile-dropdown'>
          <button className='profile' onClick={toProfile}>
            Profile
          </button>
          <button className='profile' onClick={logout}>Logout</button>
          <button className='profile' onClick={discover}>
            Find others
            </button>
      </div>
      </div>
      </>
    )}
    </>
  )
}

export default ProfileButton