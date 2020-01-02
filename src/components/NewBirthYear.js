import React, { useState } from 'react'

const NewBirthYear = ({ authors, editAuthor }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({
      variables: { name, born }
    })

    setName(authors[0].name)
    setBorn('')
  }

  return (
    <div>
      <h4>Set year of birth</h4>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
          </div>
        <div>
          Born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default NewBirthYear