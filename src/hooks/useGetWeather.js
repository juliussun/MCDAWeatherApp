import React, {useState,useEffect} from 'react'
import * as Location from 'expo-location'

export const useGetWeather = ()=>{
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState([])
    const [lat,setLat] = useState([])
    const [lon,setLon] = useState([])
  
    const fetchWeatherData = async()=>{
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`)
        const data = await res.json()
        setWeather(data)
      } catch (error) {
        setError(error)
      }
    }
  
  
    useEffect(() => {
      (async() => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setError('permission to access location was denied')
          return
        }
        let location = await Location.getCurrentPositionAsync({})
        setLat(location.coords.latitude)
        setLon(location.coords.longitude)
        await fetchWeatherData()
      })()
    },[lat,lon])

    return [error,weather]
}