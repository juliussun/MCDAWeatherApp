import React, { useState, useEffect } from 'react'

export const useGetCityWeather = ({ lat, lon, name, country }) => {
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!lat || !lon) return
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`
        )
        const data = await res.json()
        setWeather(data)
      } catch (error) {
        setError(error)
      }
    }
    fetchWeatherData()
  }, [lat, lon])

  return [error, weather]
}
