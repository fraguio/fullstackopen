const Weather = ({ weather, capital }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature: {weather.main.temp}°C</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather
