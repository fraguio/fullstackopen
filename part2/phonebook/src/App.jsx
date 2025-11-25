import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  })

  useEffect(() => {
    personService.getAllPersons().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleError = (error, action, personId, personName) => {
    console.error(`Error ${action} person:`, error)
    if (error.response && error.response.status === 404) {
      showNotification(
        'error',
        `Information of ${personName} has already been removed from server`,
      )
      if (personId) {
        setPersons(persons.filter(person => person.id !== personId))
      }
    } else {
      showNotification(
        'error',
        `Error ${action} ${personName}: ${error.message}`,
      )
    }
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(
      () =>
        setNotification({
          type: null,
          message: null,
        }),
      3000,
    )
  }

  const addPerson = event => {
    event.preventDefault()
    const previousPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase(),
    )
    if (previousPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      )
      if (!confirmReplace) {
        clearForm()
        return
      } else {
        personService
          .updatePerson(previousPerson.id, {
            ...previousPerson,
            number: newNumber,
          })
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            )
            showNotification(
              'success',
              `Updated ${updatedPerson.name} with number ${updatedPerson.number}`,
            )
            clearForm()
          })
          .catch(error => {
            handleError(
              error,
              'updating',
              previousPerson.id,
              previousPerson.name,
            )
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(
            'success',
            `Added ${returnedPerson.name} with number ${returnedPerson.number} `,
          )
          clearForm()
        })
        .catch(error => {
          handleError(error, 'creating', undefined, personObject.name)
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (!confirmDelete) {
      return
    }

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        handleError(error, 'deleting', id, name)
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
      <Notification type={notification.type} message={notification.message} />
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
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
