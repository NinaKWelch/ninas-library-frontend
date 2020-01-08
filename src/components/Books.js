import React, { useState } from 'react'
import BookList from './BookList'

const Books = ({ show, result }) => {
  const [genre, setGenre] = useState('all')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const listGenders = () => {
    // create a single array of all added genres
    const allGenres = result.data.allBooks.map(a => a.genres).flat()
    // remove duplicates
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    const uniqueGenres = allGenres.reduce(function(a, b) {
      if (a.indexOf(b) < 0) a.push(b);
        return a
      }, []
    )

    return uniqueGenres.map(g =>
      <button key={g} onClick={() => setGenre(g)}>
        {g}
      </button>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      <BookList books={result.data.allBooks} genre={genre} />

      <div>
        {listGenders()}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books