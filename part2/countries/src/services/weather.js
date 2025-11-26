import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = city => {
  const url = `${baseUrl}${city}&units=metric&appid=${apiKey}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default { getWeather }
