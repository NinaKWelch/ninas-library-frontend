import React from 'react'

const Recommend = ({ show, result, user }) => {
  if (!show) {
    return null
  }
  
  console.log(user.data.me)

  const filterByFavoriteGenre = genre =>
    result.data.allBooks.filter(a => a.genres.includes(genre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>patterns</strong></p>

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
          {user 
            ? filterByFavoriteGenre(user.data.me.favoriteGenre).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
            : ''
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
