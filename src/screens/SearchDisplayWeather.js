import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useGetCities } from '../hooks/useGetCities'
import { useGetCityWeather } from '../hooks/useGetCityWeather'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { insertCityData, insertCityData1 } from '../components/db'
import { wmocode } from '../components/const'

export default function SearchDisplayWeather() {
  const [searchString, setSearchString] = useState('')
  const { cities, error, loading } = useGetCities(searchString)
  const [city, setCity] = useState({ name: null, country: null, lat:null, lon:null })
  const [err, cityweather] = useGetCityWeather(city)
  const [show, setShow] = useState(false)
  const [isPressed, setIsPressed] = useState(false);
  const [errormsg,setErrormsg] = useState(null)

  console.log(cityweather)

  const handleSearchInput = (text) => {
    setSearchString(text)
    setShow(true)
  }

  const handlePress = async () => {
    console.log(city);
    try {
      await insertCityData(city.name, city.country, city.lat, city.lon);
      setIsPressed(true);
      setErrormsg(null)
    } catch (error) {
      setIsPressed(false)
      setErrormsg(error)
      console.log("save city failed",error)
    }
  };

  const getDescription = (weather_code)=> wmocode[weather_code]?.day?.description?? ""

  function City(props) {
    const { name, country, latitude, longitude } = props
    return (
      <View style={styles.line}>
        <Text style={styles.suggestions}>{name}</Text>
        <Text style={styles.suggestions}>{country}</Text>
        <Text style={styles.suggestions}>{latitude}</Text>
        <Text style={styles.suggestions}>{longitude}</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setCity({ name: item.name, country: item.country, lat:item.latitude, lon:item.longitude })
        setShow(false)
      }}
    >
      <City
        name={item.name}
        country={item.country}
        latitude={item.latitude}
        longitude={item.longitude}
      />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Type City Names"
        onChangeText={handleSearchInput}
        style={styles.container}
        value={searchString}
        containerStyle={styles.search}
        inputContainerStyle={styles.search}
        lightTheme="true"
        onClear={() => {setShow(false);setIsPressed(false);setErrormsg(null)}}
      />
      {cities && show && searchString !== '' && (
        <FlatList data={cities} renderItem={renderItem} />
      )}
      {cityweather.current && searchString.length > 3 && (
        <View style={styles.city}>
          <Text style={styles.heading}>Previous Searched</Text>
          <Text style={styles.timezone}>{cityweather.timezone}</Text>
          <Text style={styles.temp}>
            {cityweather.current.temperature_2m}°C
          </Text>
          <Text style={styles.temp}>
            {getDescription(cityweather.current.weather_code)}
          </Text>
          <Text style={styles.temp}>
            {cityweather.current.relative_humidity_2m}%
          </Text>
          <Text style={styles.temp}>updated at {cityweather.current.time}</Text>
          <Button
          onPress={handlePress}
          disabled={isPressed}
          buttonStyle={{
            width:80,
            marginTop:20
          }}
            icon={{
              name: 'bookmark',
              size: 25,
              color: 'white',
            }}
          />
        </View>
      )}
      {errormsg && <Text style={styles.msg}>{errormsg}</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    backgroundColor:"white",
    color: '#3FD9AF',
    height:50
  },
  search: {
    backgroundColor:"white",
    color: '#3FD9AF',
  },
  text: {
    color: 'white'
  },
  suggestions: {
    color: 'black'
  },
  line: {
    flexDirection: 'row',
    gap: 20,
    margin: 2,
    padding: 18,
    borderWidth: 0.2,
    borderColor: '#3FD9AF',
    justifyContent: 'space-between'
  },
  temp: {
    color: '#F0F4B8',
    fontSize: 20
  },
  city: {
    padding: 35,
    margin: 7,
    height: 400,
    backgroundColor: '#2EBB99',
    borderRadius: 5,
    gap: 15
  },
  timezone: {
    fontSize: 30,
    color: '#CDE9F7'
  },
  heading: {
    color: '#D7F5FB'
  },
  msg:{
    color: "red",
    margin:20
  }
})