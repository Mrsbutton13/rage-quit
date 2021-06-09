import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import logo from '../../images/logo.png'
import '../NavBar/NavBar.css'


function CategoryButton() {
  const [showMenu, setShowMenu] = useState(false)


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

  return (
    <>
    <button className='dropdown-img' onClick={openMenu}>
    <div className='menu'>
        <img src={logo} className='logo'/>
      <div className='dpad'>
        <i className="fas fa-plus-circle"></i>
      </div>
    </div>
    </button>

    {showMenu && (
      <>
      <div className='menu-position'>
      <div className='menu-items'>
        <NavLink className='category1' exact={true} to='/'>Home</NavLink>
        <NavLink className='category1' exact={true} to="/category/1">
            Action
        </NavLink>
        <NavLink className='category1' exact={true} to='/category/2'>
            Adventure
        </NavLink>
        <NavLink className='category1' exact={true} to='/category/3'>
            Puzzle
        </NavLink>
        <NavLink className='category1' exact={true} to="/category/4">
            Racing
        </NavLink>
        <NavLink className='category1' exact={true} to="/category/5">
            Role-playing Game
        </NavLink>
        <NavLink className='category1' exact={true} to="/category/6">
            Shooter
        </NavLink>
        <NavLink className='category1' exact={true} to="/category/7">
            Sports
        </NavLink>
        <NavLink className='category1' exact={true} to="/category/8">
            Strategy
        </NavLink>
      </div>
      </div>
      </>
      )}
    </>
  )
}
  


export default CategoryButton