import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getGames } from '../../store/game'
import { getCategory } from '../../store/category'
import Game from '../GameComponent'
import Carousel from 'react-bootstrap/Carousel'
import './Splash.css'
import GTA5 from '../../images/GTA5.png'
import Ark from '../../images/Ark.png'
import RainbowSix from '../../images/RainbowSix.png'
import WOW from '../../images/WOW.png'
import Fortnite from '../../images/Fortnite.png'
import logo from '../../images/logo.png'
import { NavLink } from 'react-router-dom'
import Footer from '../Footer'

function SplashPage() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  let { id } = useParams()

  useEffect(async () => {
    await dispatch(getCategory())
    await dispatch(getGames(id))
    await setLoaded(true)
  }, [dispatch])

  return (
    <>
    { loaded && (
      <>
      <Carousel className='carousel' fade indicators={false}>
        <Carousel.Item  interval={1000}>
          <img className='carousel-img' src={Ark}/>
        </Carousel.Item>
        <Carousel.Item  interval={1000}>
          <img className='carousel-img' src={WOW}/>
        </Carousel.Item>
        <Carousel.Item  interval={1000}>
          <img className='carousel-img' src={Fortnite}/>
        </Carousel.Item>
        <Carousel.Item  interval={1000}>
          <img className='carousel-img' src={RainbowSix}/>
        </Carousel.Item>
        <Carousel.Item  interval={1000}>
          <img className='carousel-img' src={GTA5}/>
        </Carousel.Item>
      </Carousel>
  
      <div className='info'>
        <img className='info-logo' src={logo}/>
        <span className='welcome'>Welcome to Rage-Quit! Where gamers alike can get to know each other, befriend each other, and game with each other. Find gamers who like the same games you like and play on the same platforms you play on. Get your gaming on!</span>
      </div>

      <div className='container'> 
        <CategoriezedGames />
      </div>
    </>
    )}
    <Footer />
    </>
  )
}

export const CategoriezedGames = () => {
  const games = useSelector((state) => Object.values(state.game))
  const categories = useSelector((state) => Object.values(state.category))

  useEffect(() => {
    getCategory()
    getGames()
  }, [])

  
  return  (
    <>
      {categories.map((category) => (
      <div key={category.id} className='category-container'>
        <div className='more-container'>
          <div className='cat-title'>{category.name}</div>
            <NavLink to={`/category/${category.id}`} className='more'>Find More --></NavLink>
          </div>
        <div className='game-container'>
          {games.filter(game => game?.category_id === category.id).slice(0,6).map(game => (
            <Game key={game.id} game={game} category={category.id}/>
            ))
          }
          </div>
      </div>
      ))}
    </>
  )
}



export default SplashPage