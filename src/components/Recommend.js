import React from 'react'
import BookList from './BookList'

const Recommend = ({ show, result, user }) => {
  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>patterns</strong></p>

      <BookList books={result.data.allBooks} genre={user.data.me.favoriteGenre} />
    </div>
  )
}

export default Recommend
