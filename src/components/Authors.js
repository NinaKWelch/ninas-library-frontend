import React from 'react'
import NewBirthYear from './NewBirthYear'

const Authors = ({ show, result, editAuthor }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <NewBirthYear
        authors={result.data.allAuthors}
        editAuthor={editAuthor}
      />
    </div>
  )
}

export default Authors