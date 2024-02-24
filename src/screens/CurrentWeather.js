import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/themed'
import { wmocode } from '../components/const'

const weatherIcon = {
  0:"weather-sunny",
  1:"weather-partly-cloudy",
  2:"weather-cloudy",
  3:"weather-cloudy"
}

export default function CurrentWeather({ weatherData }) {
  console.log("Show City Weather:",weatherData)
  const {
    timezone ='',
    elevation = 0,
    current: {time = '', temperature_2m = 0, relative_humidity_2m = 0, precipitation = 0, weather_code = 0 } = {}
  } = weatherData || {}


  const getDescription = (weather_code)=> wmocode[weather_code]?.day?.description?? ""
  const getWeatherIcon = (weather_code)=> wmocode[weather_code]?.day?.image?? ""
  const getBgImg = (weather_code)=> {
    return wmocode[weather_code].bgImg.image || require('../../assets/man.jpg')
  }

  console.log((getBgImg(weather_code)));

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={getBgImg(weather_code)}
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={styles.city}>{timezone}</Text>
          <Text style={styles.temp}>{temperature_2m}°C</Text>
          <Icon name={getWeatherIcon(weather_code)} type='material-community' size={80} color="#fff" />
          <Text style={styles.code}>{getDescription(weather_code)}</Text>
          <Text style={styles.feels}>{relative_humidity_2m}%</Text>
          <View style={styles.highLowWrapper}>
            <Text style={styles.time}>update: {time}</Text>
          </View>
          <View style={styles.bodyWrapper}>
            <Text style={styles.text}>powered by Julius</Text>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  temp: {
    color: 'white',
    fontSize: 58
  },
  city: {
    color: 'white',
    fontSize: 28,
    marginTop:50,
    shadowColor:"black",
    shadowOffset:{width:2,height:2},
    shadowOpacity:1,
    shadowRadius:3
  },
  feels: {
    fontSize: 30,
    color: 'white'
  },
  time: {
    color: 'white',
    fontSize: 20
  },
  highLowWrapper: {
    flexDirection: 'row',
    marginTop:400,
    gap: 8
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  image: {
    flex: 1
  },
  text:{
    color:'white'
  },
  code:{
    fontSize:25,
    color:"#EAEAD7"
  }
})
