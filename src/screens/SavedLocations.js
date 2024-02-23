import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from "react-native"
import { deleteCityData, fetchCities } from "../components/db";
import { Button } from "react-native-elements";

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
    const {name, country, id, onDelete} = props;
    return (
        <View style={styles.list}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{country}</Text>
            <Button 
            buttonStyle={{
                width:35,
                height:30,
            }}
            icon={{
                name: 'delete',
                size: 10,
                color: 'white',
              }}
            onPress={() => onDelete(id)} 
            />
        </View>
    )
}

export default function SavedLocations(){
    
    const [cities,setCities] = useState([]);
    
    const handleFetchCities = async () => {
        await fetchCities().then((data)=>setCities(data)).catch((e)=>console.log(e))
    }
    
    console.log("Cities are: ",cities);
    
    const renderItem = ({item}) => (
        <City name={item.name} country={item.country} id={item.id} onDelete={handleDelete}/>
    )

    const handleDelete = (id) => {
        deleteCityData(id);
        handleFetchCities();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Saved Cities</Text>
            <FlatList
                data={cities}
                renderItem={renderItem}
            />
            <StatusBar style="auto" />
            <Button 
            onPress={handleFetchCities} 
            buttonStyle={{
                width:80,
                marginTop:20
            }}
            title="refresh"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text:{
        color:"black",
    },
    container:{
        margin:80,
    },
    list:{
        flexDirection: 'row',
        gap:10,
        justifyContent:"space-between"
    }
})