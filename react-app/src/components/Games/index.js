import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getTopGames } from '../../store/games'
import Carousel from 'react-bootstrap/Carousel'
import { getGenres } from '../../store/genres'
import { NavLink } from 'react-router-dom'
import Game from '../GameComponent'
import GTA5 from '../../images/GTA5.png'
import Ark from '../../images/Ark.png'
import RainbowSix from '../../images/RainbowSix.png'
import WOW from '../../images/WOW.png'
import Fortnite from '../../images/Fortnite.png'
import logo from '../../images/logo.png'
import './home.css'

function Home () {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  

  useEffect(async() =>{
    await dispatch(getGenres())
    await dispatch(getGames())
    await setLoaded(true)
  },[dispatch])

  return (
    <>
    {loaded && (
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
        <CategorizedGames />
      </div>
      </>
    )}
    </>
  )
}

export const CategorizedGames = () => {
  const games = useSelector((state) => Object.values(state.game))
  const genres = useSelector((state) => Object.values(state.genre))
  console.log(genres)
  console.log(games)

  useEffect(async () => {
    await getGames()
    await getGenres()
  }, [])

  return (
    <>
      {games.map(game => (
          <>
        <div  key={game.id} className='game-container'>
          <Game key={game.id} game={game}/>
        </div>
        </>
    ))}
    </>
  )
}
export default Home