import { useEffect, useState } from 'react'
import weatherService from '../services/weather'
import Weather from './Weather'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const capital = country.capital?.[0]
    if (!capital) return

    weatherService.getWeather(capital).then(data => {
      setWeather(data)
    })
  }, [country])

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

      {weather && <Weather weather={weather} capital={country.capital} />}
    </div>
  )
}

export default CountryDetail
