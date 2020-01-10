import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import BookList from './BookList'

const FIND_BOOKS = gql`
  query findBooksByGenre($genreToSearch: String!) {
    allBooks(genre: $genreToSearch) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`

const Books = ({ show, result, client }) => {
  const [booksToShow, setBooksToShow] = useState(null)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const showBooks = async (genre) => {
    const { data } = await client.query({
      query: FIND_BOOKS,
      variables: { genreToSearch: genre }
    })
    
    setBooksToShow(data.allBooks)
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
      <button key={g} onClick={() => showBooks(g)} style={{ marginRight: 7 }}>
        {g}
      </button>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      {booksToShow 
        ? <BookList books={booksToShow} />
        : <BookList books={result.data.allBooks} />
      }

      <div style={{ marginTop: 20 }}>
        {listGenders()}
        <button onClick={() => setBooksToShow(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books