import React from 'react'

const BookList = ({ books }) => {
  
  const headerStyle = {
    textAlign: 'left',
    paddingBottom: 7,
    borderBottom: '1px solid #000'
  }

  const listStyle = {
    paddingRight: 25
  }

  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>
            Book
          </th>
          <th style={headerStyle}>
            Author
          </th>
          <th style={headerStyle}>
            Published
          </th>
        </tr>

        {books.map(a =>
          <tr key={a.id}>
            <td style={listStyle}>{a.title}</td>
            <td style={listStyle}>{a.author.name}</td>
            <td style={listStyle}>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookList
