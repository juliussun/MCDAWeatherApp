import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useGetCities } from '../hooks/useGetCities'

export default function SearchDisplayWeather() {
  const [searchString, setSearchString] = useState('')
  const {cities,error,loading} = useGetCities(searchString)
//   const cities = [[{"admin1": "Beijing", "admin1_id": 2038349, "admin2": "Beijing", "admin2_id": 11876380, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 49, "feature_code": "PPLC", "id": 1816670, "latitude": 39.9075, "longitude": 116.39723, "name": "Beijing", "population": 11716620, "timezone": "Asia/Shanghai"}, {"country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 523, "feature_code": "PPL", "id": 1816671, "latitude": 35.20917, "longitude": 110.73278, "name": "Beijing", "timezone": "Asia/Shanghai"}, {"admin1": "Jiangxi", "admin1_id": 1806222, "admin2": "Jiujiang Shi", "admin2_id": 1805178, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 19, "feature_code": "PPL", "id": 7636037, "latitude": 29.34644, "longitude": 116.19873, "name": "Beijing", "timezone": "Asia/Shanghai"}, {"admin1": "Guangdong", "admin1_id": 1809935, "admin2": "Shaoguan Shi", "admin2_id": 1795873, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 119, "feature_code": "PPL", "id": 8212997, "latitude": 25.07655, "longitude": 114.26569, "name": "Beijing", "timezone": "Asia/Shanghai"}, {"admin1": "Chongqing", "admin1_id": 1814905, "admin2": "Chongqing", "admin2_id": 8739734, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 583, "feature_code": "PPL", "id": 8404324, "latitude": 30.72608, "longitude": 108.67483, "name": "Beijing", "timezone": "Asia/Shanghai"}, {"admin1": "Hebei", "admin1_id": 1808773, "admin2": "Chengde Prefecture", "admin2_id": 2038085, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 565, "feature_code": "PPL", "id": 9993452, "latitude": 41.26173, "longitude": 119.10803, "name": "Beijing", "timezone": "Asia/Shanghai"}, {"admin1": "Sichuan", "admin1_id": 1794299, "admin2": "Chengdu Shi", "admin2_id": 1815285, "country": "China", "country_code": "CN", "country_id": 1814991, "elevation": 587, "feature_code": "PPL", "id": 10196578, "latitude": 30.9699, "longitude": 103.94, "name": "Beijing", "timezone": "Asia/Shanghai"}], null]

  console.log(cities)
  console.log(searchString)

  const handleSearchInput = (text) => {
    setSearchString(text)
  }

  function City(props){
    const {name,country,latitude,longitude} = props;
    return (
        <View style={styles.line}>
            <Text style={styles.suggestions}>{name}</Text>
            <Text style={styles.suggestions}>{country}</Text>
            <Text style={styles.suggestions}>{latitude}</Text>
            <Text style={styles.suggestions}>{longitude}</Text>
        </View>
    )
}

  const renderItem = ({item}) => (
    // <TouchableOpacity onPress={() => console.log('City pressed', item.name)}>
    //   <City name={item.name} />
    // </TouchableOpacity>
      <City 
      name={item.name} 
      country={item.country}
      latitude={item.latitude}
      longitude={item.longitude}
      />
  )

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Type City Names"
        onChangeText={handleSearchInput}
        style={styles.container}
        value={searchString}
      />
      {cities && searchString !== '' && (
        <FlatList
        data={cities}
        renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    color: 'white'
  },
  text: {
    color: 'white'
  },
  suggestions:{
    color:"black"
  },
  line:{
    flexDirection: 'row',
    gap: 20,
    margin:2,
    padding:18,
    borderWidth:0.5,
    borderColor: "#CBCED0",
    justifyContent:"space-between"
  }
})
