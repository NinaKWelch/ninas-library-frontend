import React, { useState } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

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
    author {
      name
    }
    published
    id
  }
}
`

const ADD_NEW_BOOK = gql`
  mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

const EDIT_BIRTHYEAR = gql`
mutation editBirthyear($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born)  {
    name
    born
    id
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS }
    ]
  })

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR)

  const [login] = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token
          ? <span>
              <button onClick={() => setPage('add')}>Add book</button>
              <button onClick={logout}>Logout</button>
            </span>   
          : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
        token={token}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        handlePage={setPage}
      />
    </div>
  )
}

export default App
