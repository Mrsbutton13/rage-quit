const SET_GENRE = 'genre/setGenre'

const setGenre = (genre) => ({
  type: SET_GENRE,
  genre
})

export const getGenres = () => async(dispatch) => {
  const res = await fetch('api/genres')
  const data = await res.json()
  dispatch(setGenre(data.genre))
  return res
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case SET_GENRE:
      newState = {}
      action.genre.forEach(item => {
        newState[item.id] = item
      })
      return newState
    default:
      return state
  }
}

export default reducer