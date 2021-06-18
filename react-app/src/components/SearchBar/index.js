import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { getGames } from '../../store/game'
import './SearchBar.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [ input, setInput ] = useState('')
  const [ gameList, setGameList ] = useState([])

  
  const gameObj = useSelector((state) => Object.values(state.game))
  
  const games = Object.values(gameObj)

  
  function updateSearch (e) {
    e.preventDefault()
    const filtered = games.filter(game => {
       return game.title.toLowerCase().includes(input.toLowerCase())
      })
      setInput('')
      setGameList(filtered)
      return gameList
    }
  

  useEffect(() => {
    dispatch(getGames())
  }, [dispatch])

  return (
    <>
      <form onSubmit={updateSearch}>
      <input className='search' 
      placeholder='search' 
      value={input}
      onChange={(e) => setInput(e.target.value)}/>
      <button className='search-button' type='submit'>search</button>
      </form>
      {gameList.length > 0 && (
        <Redirect to='/results'/>
      )}
      </>
  )
}



export default SearchBar