import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import CurrentWeather from './src/screens/CurrentWeather'
import SavedLocations from './src/screens/SavedLocations'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchDisplayWeather from './src/screens/SearchDisplayWeather'
import { useGetWeather } from './src/hooks/useGetWeather'

const Tab = createMaterialTopTabNavigator()

export default function App() {
  const [error,weather] = useGetWeather()
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="CurrentWeather" 
        style={styles.container}
        screenOptions={{
          // tabBarStyle:{height:100},
          tabBarLabelStyle:{fontSize:12,paddingTop:32},
          tabBarActiveTintColor:'#2E95DE',
          tabBarInactiveTintColor:'white',
          tabBarStyle:{backgroundColor:'#AECEE5'},
          tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Hide
          swipeEnabled: true,
        }}
        >
          <Tab.Screen name="Current">{()=><CurrentWeather weatherData={weather}/>}</Tab.Screen>
          <Tab.Screen name="Saved" component={SavedLocations} />
          <Tab.Screen
            name="Search"
            component={SearchDisplayWeather}
          />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
