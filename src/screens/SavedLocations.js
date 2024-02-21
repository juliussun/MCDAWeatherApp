import React from "react"
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from "react-native"

const DATA = [
    {
        "name": "Beijing",
    },
    {
        "name": "New York",
    },
    {
        "name": "Toronto"
    }
]

function City(props){
    const {name} = props;
    return (
        <View>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

export default function SavedLocations(){

    const renderItem = ({item}) => (
        <City name={item.name}/>
    )
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Saved Cities</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{
        color:"white",
    },
    container:{
        margin:80,
    }
})