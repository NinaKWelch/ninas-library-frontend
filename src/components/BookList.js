import React from 'react'

const BookList = ({ books, genre }) => {

  const filterByGenre = () => genre !== 'all'
    ? books.filter(a => a.genres.includes(genre))
    : books

  return (
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

        {filterByGenre().map(a =>
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
