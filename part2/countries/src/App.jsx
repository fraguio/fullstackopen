import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleShowOnClick = country => {
    setFilter(country.name.common)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => setCountries(initialCountries))
  }, [])

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={filteredCountries}
        handleShowOnClick={handleShowOnClick}
      />
    </div>
  )
}

export default App
