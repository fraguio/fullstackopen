const CountryDetail = ({ country }) => {
  const languages = Object.entries(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default CountryDetail
