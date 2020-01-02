import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
    id
  }
}
`

const ADD_NEW_BOOK = gql`
  mutation addNewBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`

const EDIT_BIRTHYEAR = gql`
mutation editBirthyear($name: String!, $born: String!) {
  editAuthor(name: $name, setBornTo: $born)  {
    name
    born
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      },
      {
        query: ALL_BOOKS
      }
    ]
  })
  const [editAuthor] = useMutation(EDIT_BIRTHYEAR)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />
    </div>
  )
}

export default App
