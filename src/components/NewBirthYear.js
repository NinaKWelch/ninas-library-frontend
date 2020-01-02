import React, { useState } from 'react'

const NewBirthYear = ({ editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({
      variables: { name, born }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set year of birth</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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