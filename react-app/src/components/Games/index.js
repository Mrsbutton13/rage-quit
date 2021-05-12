import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from '../../store/games'

function Home () {
  const dispatch = useDispatch()
  const gameItems = useSelector(state => state.game)
  console.log(gameItems)

  useEffect(async() =>{
    await dispatch(getGames())
  },[dispatch])

  return (
    <h1> Games </h1>
  )
}

export default Home