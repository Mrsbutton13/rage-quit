import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Game from '../GameComponent'
import './SearchPage.css'

const SearchPage = ({gameList}) => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState = (false)
  const catigories = useSelector(state => Object.values(state.category))
  
  return (
    <>
    {gameList.map(game => (
      <>
      {catigories.map(category => (
        <Game game={game} category={category} />
      ))}
      </>
    ))}
    </>
  )
}

export default SearchPage