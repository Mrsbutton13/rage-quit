import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'
import './Footer.css'



const Footer = () => {

  return (
    <div className='footer-container'>
        <div className='inner-cont'>
          <img className='img' src={logo} />
          <div className='cat-foot'>
            <span className='cat'>Genres</span>           
            <Link to={'/category/1'} className='category'>
              <div className='cat-1'>
                <div className='cat-div'> Action</div>
              </div>
            </Link>
            <Link to={'/category/2'} className='category'>
              <div className='cat-2'>
                <div className='cat-div'> Adventure</div>
              </div>
            </Link>
            <Link to={ `/category/3` } className='category'>
              <div className='cat-3'>                
                <div className='cat-div'>Puzzle</div>
              </div>
            </Link>
            <Link to={ `/category/4` } className='category'>
              <div className='cat-4'>                
                <div className='cat-div'>Racing</div>
              </div>
            </Link>
            <Link to={ `/category/5` } className='category-5'>
              <div className='cat-5'>                
                <div className='cat-div'>RPG</div>
              </div>
            </Link>
            <Link to={ `/category/6` } className='category'>
              <div className='cat-6'>       
                <div className='cat-div'>Shooter</div>
              </div>
            </Link>
            <Link to={ `/category/7` } className='category'>
              <div className='cat-7'>       
                <div className='cat-div'>Sports</div>
              </div>
            </Link>
            <Link to={ `/category/8` } className='category'>
              <div className='cat-8'>       
                <div className='cat-div'>Strategy</div>
              </div>
            </Link>
          </div>
          <div className='resources'>
            <span className='resource'>Resources</span>
            <Link className='map' to='/'>Sitemap</Link>
            <Link className='help1' to='/'>Help</Link>
            <Link className='contact' to='/'>Contact</Link>
          </div>
          <div className='find-us'>
            <span className='find'> Find Me </span>
            <Link className='linked-In' to='www.linkedin.com/in/laurabutton-13'>
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link className='github' to='https://mrsbutton13.github.io/'>
              <i className="fab fa-github"></i>
            </Link>
          </div>
          </div>
          
      </div>
  )
}


export default Footer