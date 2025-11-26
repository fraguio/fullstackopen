import CountryDetail from './CountryDetail'
import CountryListItem from './CountryListItem'

const Countries = ({ countries, handleShowOnClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <CountryListItem
          key={country.cca3}
          country={country}
          handleShowOnClick={handleShowOnClick}
        />
      ))}
    </div>
  )
}

export default Countries
