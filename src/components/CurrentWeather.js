import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

export default function CurrentWeather() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.temp}>6</Text>
        <Icon name='sunny' size={50}/>
        <Text style={styles.feels}>Feels Like 5!</Text>
        <View style={styles.highLowWrapper}>
          <Text style={styles.highLow}>High: 8</Text>
          <Text style={styles.highLow}>Low: 6</Text>
        </View>
        <View style={styles.bodyWrapper}>
          <Text>Its sunny</Text>
          <Text>Its perfect t-shirt weather</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  wrapper:{
    backgroundColor:'#fff',
    flex:1,
  },
  temp:{
    color:'black',
    fontSize:48
  },
  feels:{
    fontSize:30,
    color:'black'
  },
  highLow:{
    color:'black',
    fontSize:20
  },
  highLowWrapper:{
    flexDirection:'row',
    gap:8
  },
  bodyWrapper:{
    justifyContent:'flex-end',
    alignItems:'flex-start'
  }
})
