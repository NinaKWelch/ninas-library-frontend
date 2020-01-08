import React from 'react'

const BookList = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>
            Book
          </th>
          <th>
            Author
          </th>
          <th>
            Published
          </th>
        </tr>

        {books.map(a =>
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookList
