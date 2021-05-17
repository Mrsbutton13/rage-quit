import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getTopGames } from '../../store/games'
import Carousel from 'react-bootstrap/Carousel'
import { getGenres } from '../../store/genres'
import { NavLink } from 'react-router-dom'
import Game from '../GameComponent'

function Home () {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  

  useEffect(async() =>{
    await dispatch(getGenres())
    await dispatch(getTopGames())
    await setLoaded(true)
  },[dispatch])

  return (
    <>
    {loaded && (
      <>
      <h1> Games </h1>
      <CategorizedGames/>
      </>
    )}
    </>
  )
}

export const CategorizedGames = () => {
  const games = useSelector((state) => Object.values(state.topGame))
  const genres = useSelector((state) => Object.values(state.genre))
  console.log(genres)
  console.log(games)

  useEffect(async () => {
    await getTopGames()
    await getGenres()
  }, [])

  return (
    <>
    {genres.map(genre => (
      <div key={genre.id} className='genre-container'>
        <div className='more-container'>
          <div className='cat-title'>{genre.name}</div>
            <NavLink to={`/category/${genre.id}`} className='more'>Find More --></NavLink>
          </div>
        <div className='game-container'>
         {genre.games.map(game => (
           <>
           {games.map(g => (
             (game.name === g.name ? (
               <>
                <Game g={g} genre={genre}/>
               </>
             ):null)
           ))}
           </>
         ))}
        </div>
      </div>
    ))}
    </>
  )
}
export default Home