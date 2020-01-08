import React, { useState } from 'react'

const NewBirthYear = ({ authors, editAuthor }) => {
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
      <h4>Set year of birth</h4>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          > 
            <option value=''>Select author...</option>
            {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
          </div>
        <div>
          Born
          <input
            type='number'
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