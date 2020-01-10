import React, { useState } from 'react'

const NewBook = ({ show, addBook, token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!show) {
    return null
  }

  if (!token) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    await addBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const mainStyle = {
    width: 220,
    marginTop: 20,
    padding: '0 0 20px 20px',
    border: '1px solid #000'
  }

  const inputStyle = {
    paddingBottom: 10
  }

  return (
    <div style={mainStyle}>
      <h3 style={{ textAlign: 'center' }}>Add a Book</h3>

      <form onSubmit={submit}>
        <div style={inputStyle}>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            style={{ marginLeft: 7 }}
          />
        </div>
        <div style={inputStyle}>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
            style={{ marginLeft: 7 }}
          />
        </div>
        <div style={inputStyle}>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            style={{ marginLeft: 7 }}
          />
        </div>
        <div style={inputStyle}>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button" style={{ marginLeft: 7 }}>
          Add genre
          </button>
        </div>
        <div>
          Genres: {genres.join(' ')}
        </div>
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <button type='submit'>Ceate book</button>        
        </div>

      </form>
    </div>
  )
}

export default NewBook