import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}  
`

const CURRENT_USER = gql`
  {
    me {
      favoriteGenre
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  } 
  ${BOOK_DETAILS}
 `

const App = () => {
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(CURRENT_USER)

  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      dataInStore.allBooks.push(newBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      notify(`${newBook.title} added`)
      updateCacheWith(newBook)
    }
  })

  const [addBook] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS }
    ],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
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
      {message &&
        <div style={{color: 'green'}}>
          {message}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token
          ? <span>
              <button onClick={() => setPage('add')}>Add book</button>
              <button onClick={() => setPage('recommend')}>Recommend</button>
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

      <Recommend
        show={page === 'recommend'}
        result={books}
        user={user}
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
