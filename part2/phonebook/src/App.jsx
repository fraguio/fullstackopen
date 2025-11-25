import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = event => {
    event.preventDefault()
    if (
      persons.some(
        person => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      alert(`${newName} is already added to phonebook`)
      clearForm()
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      clearForm('')
    })
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  const handlePersonChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
