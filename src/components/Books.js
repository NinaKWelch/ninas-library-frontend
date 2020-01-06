import React, { useState } from 'react'

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

  const filterByGenre = genre => genre !== 'all'
    ? result.data.allBooks.filter(a => a.genres.includes(genre))
    : result.data.allBooks

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {filterByGenre(genre).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {listGenders()}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books