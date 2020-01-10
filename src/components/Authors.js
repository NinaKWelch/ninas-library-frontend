import React from 'react'
import NewBirthYear from './NewBirthYear'

const Authors = ({ show, result, editAuthor, token }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const headerStyle = {
    textAlign: 'left',
    paddingBottom: 7,
    borderBottom: '1px solid #000'
  }

  const listStyle = {
    paddingRight: 25
  }

  return (
    <div>
      <h2>Authors</h2>

      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>
              Author
            </th>
            <th style={headerStyle}>
              Born
            </th>
            <th style={headerStyle}>
              Books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td style={listStyle}>{a.name}</td>
              <td style={listStyle}>{a.born}</td>
              <td style={listStyle}>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {token
        ? <NewBirthYear
            authors={result.data.allAuthors}
            editAuthor={editAuthor}
          />
        : ''
      }
    </div>
  )
}

export default Authors