import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native'
import { deleteCityData, fetchCities } from '../components/db'
import { Button } from 'react-native-elements'

function City(props) {
  const { name, country, id, lat, lon, temp, humidity, onDelete } = props
  return (
    <View>
      <View style={styles.line}>
        <View style={styles.city}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.country}>{country}</Text>
        </View>
        <Text style={styles.content}>{temp}°C</Text>
        <Text style={styles.content}>{humidity}%</Text>
        <Button
          buttonStyle={{
            width: 40,
            height: 35,
            backgroundColor:"transparent",
            alignItems:"flex-end"
          }}
          icon={{
            name: 'close',
            size: 18,
            color: '#D6E5F2',
          }}
          onPress={() => onDelete(id)}
        />
      </View>
    </View>
  )
}

export default function SavedLocations() {
  const [cities, setCities] = useState([])

  const fetchCityWeather = async (city) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`
    )
    const weatherdata = await res.json()
    return weatherdata
  }

  const handleFetchCities = async () => {
    try {
      const citiesData = await fetchCities()
      setCities(citiesData)

      const weatherPromises = citiesData.map(async (city) => {
        console.log(
          `Fetching weather for: latitude=${city.latitude}, longitude=${city.longitude}`
        )
        const weather = await fetchCityWeather(city)
        return await { ...city, currweather: weather }
      })
      const citiesWithWeather = await Promise.all(weatherPromises)
      setCities(citiesWithWeather)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('Cities are: ', cities)

  const renderItem = ({ item }) => (
    <City
      name={item.name}
      country={item.country}
      id={item.id}
      lat={item.latitude}
      lon={item.longitude}
      temp={
        item.currweather ? item.currweather.current.temperature_2m : ''
      }
      humidity={
        item.currweather ? item.currweather.current.relative_humidity_2m : ''
      }
      onDelete={handleDelete}
    />
  )

  const handleDelete = (id) => {
    deleteCityData(id)
    handleFetchCities()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Button
          onPress={handleFetchCities}
          buttonStyle={{
            width: 50,
            margin: 20,
            backgroundColor: 'transparent'
          }}
          icon={{
            name: 'refresh',
            size: 25,
            color: 'black'
          }}
        />
        <Text style={styles.time}>updated: {cities[0]?.currweather?cities[0].currweather.current.time:""}</Text>
      </View>
      <FlatList data={cities} renderItem={renderItem} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
    textAlign:"left",
    width:150
  },
  container: {
    margin: 10
  },
  content:{
    margin:5,
    fontSize:20,
    alignItems:"center",
    color:"#F3F2CD"
  },
  line: {
    flexDirection: 'row',
    padding: 20,
    margin: 2,
    height: 100,
    borderRadius: 5,
    gap: 25,
    backgroundColor: '#2EBB99'
  },
  country:{
    fontSize:12,
    margin:2
  },
  city:{
    flex:1
  },
  time:{
    color:'#A2A292',
    margin:27,
    fontSize:12,
    textAlign:"right"
  }
})
