import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCategory } from '../../store/category'
import { getGames } from '../../store/game'
import Footer from '../Footer'
import Game from '../GameComponent'
import './Category.css'


function Category() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  const categories = useSelector((state) => Object.values(state.category))
  const games = useSelector((state) => Object.values(state.game))
  console.log(games)

  let {id} = useParams()
  
  const category = categories[id - 1]
 

  useEffect(async() => {
    await dispatch(getCategory())
    await dispatch(getGames())
    await setLoaded(true)
  },[dispatch])

  return (
    <>
    {loaded && (
        <>
        <div className='title-container'>
          <h1 className='category-titlel'>{category.name}</h1>
        </div>
        <div className='category-container'>
          {games.map(game=> (
            (game?.category_id == id ? (
              <Game key={game.id} game={game} />
              ): null)
          ))}
        </div>
        </>
    )}
    <Footer/>
    </>
  )
}

export default Category