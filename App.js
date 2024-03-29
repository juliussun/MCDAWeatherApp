import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import CurrentWeather from './src/screens/CurrentWeather'
import SavedLocations from './src/screens/SavedLocations'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchDisplayWeather from './src/screens/SearchDisplayWeather'
import { useGetWeather } from './src/hooks/useGetWeather'
import { initDB } from './src/components/db'

const Tab = createMaterialTopTabNavigator()

export default function App() {
  const [error,weather] = useGetWeather()
  useEffect(() => {
    initDB();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="CurrentWeather" 
        style={styles.container}
        screenOptions={{
          // tabBarStyle:{height:100},
          tabBarLabelStyle:{fontSize:12,paddingTop:32},
          tabBarActiveTintColor:'gold',
          tabBarInactiveTintColor:'white',
          tabBarStyle:{backgroundColor:'#2EBB99'},
          tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Hide
          swipeEnabled: true,
        }}
        >
          <Tab.Screen name="Current">{()=><CurrentWeather weatherData={weather}/>}</Tab.Screen>
          <Tab.Screen name="Saved" component={SavedLocations} />
          <Tab.Screen
            name="Search"
          >{()=><SearchDisplayWeather />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
