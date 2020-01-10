import React from 'react'
import BookList from './BookList'

const Recommend = ({ show, result, user }) => {
  if (!show) {
    return null
  }

  if (!user.data.me) {
    return null
  }
  
  if (result.loading) {
    return <div>Loading...</div>
  }

  const genre = user.data.me.favoriteGenre
  const favoriteGenre = result.data.allBooks.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre <strong>{genre}</strong>:</p>

      {favoriteGenre.length > 0 || !genre
        ? <BookList books={favoriteGenre} />
        : <p>No books currently, add some!</p>
      }
    </div>
  )
}

export default Recommend
