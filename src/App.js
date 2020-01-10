import React, { useState } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      ...AuthorDetails
    }
    published
    genres
    id
  }
  ${AUTHOR_DETAILS} 
`

const ALL_AUTHORS = gql`
  {
    allAuthors  {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS} 
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
  mutation addNewBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
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
  mutation editBirthyear($name: String!, $born: String!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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
  const [type, setType] = useState('')
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  const notify = (message, type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const handleError = error => {
    setMessage(error.graphQLErrors[0].message)
    setType('error')
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(CURRENT_USER)

  const updateCacheWith = newBook => {
    const includedIn = (set, object) => 
      set.map(x => x.id).includes(object.id)
    
    const bookData = client.readQuery({ query: ALL_BOOKS })
    const authorData = client.readQuery({ query: ALL_AUTHORS })
    const author = newBook.author

    if (!includedIn(bookData.allBooks, newBook)) {
      bookData.allBooks.push(newBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: bookData
      })
    }

    if (!includedIn(authorData.allAuthors, author)) {
      authorData.allAuthors.push(author)
      client.writeQuery({
        query: ALL_AUTHORS,
        data: authorData
      })
    } else {
      authorData.allAuthors.map(a => 
        a.id !== author.id ? a : { ...author, bookCount: author.bookCount + 1 }
      )
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      notify(`${newBook.title} by ${newBook.author.name} added`, 'success')
      updateCacheWith(newBook)
    }
  })

  const [addBook] = useMutation(ADD_NEW_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    onError: handleError
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const buttonStyle = {
    marginRight: 7
  }
  
  return (
    <div>
      {message &&
        <div style={{ color: type === 'success' ? 'green' : 'red' }}>
          {message}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')} style={buttonStyle}>Authors</button>
        <button onClick={() => setPage('books')} style={buttonStyle}>Books</button>
        {token
          ? <span>
              <button onClick={() => setPage('add')} style={buttonStyle}>Add book</button>
              <button onClick={() => setPage('recommend')} style={buttonStyle}>Recommend</button>
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

      <ApolloConsumer>
        {(client => 
          <Query query={ALL_BOOKS}>
            {(result) => 
              <Books
                show={page === 'books'}
                result={result}
                client={client}    
              /> 
            }
          </Query> 
        )}
      </ApolloConsumer>

      <Recommend
        show={page === 'recommend'}
        result={books}
        user={user}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
        token={token}
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