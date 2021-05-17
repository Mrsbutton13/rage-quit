import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from '../../store/games'

function Home () {
  const dispatch = useDispatch()
  const gameItems = useSelector(state => Object.values(state.game))
  const [loaded, setLoaded] = useState(false)
  console.log(gameItems)

  useEffect(async() =>{
    await dispatch(getGames())
    await setLoaded(true)
  },[dispatch])

  return (
    <>
    {loaded && (
      <>
      <h1> Games </h1>
      {gameItems.map(game => (
        <h2>{game.name}</h2>
      ))}
      </>
    )}
    </>
  )
}

export default Home