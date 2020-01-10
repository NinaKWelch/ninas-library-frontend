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

  const mainStyle = {
    width: 220,
    marginTop: 20,
    paddingBottom: 20,
    border: '1px solid #000',
    textAlign: 'center'
  }

  const optionStyle = {
    marginBottom: 10
  }

  return (
    <div style={mainStyle}>
      <h4>Set year of birth</h4>

      <form onSubmit={submit}>
        <div style={optionStyle}>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          > 
            <option value=''>Select author...</option>
            {authors.map(a => 
              <option key={a.id} value={a.name}>{a.name}</option>
            )}
          </select>
          </div>
        <div style={optionStyle}>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            style={{ marginLeft: 7 }}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default NewBirthYear