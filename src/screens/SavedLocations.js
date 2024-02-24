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
            name: 'delete',
            size: 15,
            color: 'grey',
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
        item.currweather ? item.currweather.current.temperature_2m : 'Loading'
      }
      humidity={
        item.currweather ? item.currweather.current.relative_humidity_2m : 'Loading'
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
      <FlatList data={cities} renderItem={renderItem} />
      <StatusBar style="auto" />
      <Button
        onPress={handleFetchCities}
        buttonStyle={{
          width: 50,
          marginTop: 20,
          backgroundColor: 'transparent'
        }}
        icon={{
          name: 'refresh',
          size: 15,
          color: 'black'
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 25,
    textAlign:"left",
    width:100
  },
  container: {
    margin: 10
  },
  content:{
    margin:5,
    fontSize:20,
    alignItems:"center"
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
    fontSize:12
  },
  city:{
    flex:1
  }
})
