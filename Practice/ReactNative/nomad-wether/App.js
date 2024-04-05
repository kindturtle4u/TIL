import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {Fontisto} from '@expo/vector-icons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

//https://openweathermap.org/api
const API_KEY = 'efc7d4ff087a4a0cd31a4aeb578b5935';

const icons = {
    "Clouds": "cloudy",
    "Clear": "day-sunny",
    "Atmosphere":"cloudy-gusts",
    "Snow":"snow",
    "Rain": "rains",
    "Drizzle":"rain",
    "Thunderstorm":"lightning",
}

export default function App() {
    const [city, setCity] = useState('Loading')
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(true);

    const getWeather = async () => {
        //const permission2 = await Location.requestBackgroundPermissionsAsync();
        //console.log(permission2);

        const {granted} = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }

        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
        console.log(latitude, longitude);

        const location = await Location.reverseGeocodeAsync({latitude, longitude})
        console.log(location);
        setCity(location[0].city ?? location[0].district ?? location[0].region);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const json = await response.json();
        console.log(json.list);
        setDays(json.list);

    }
    useEffect(() => {
        getWeather();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.weather}>
                {/*<View style={styles.day}>*/}
                {/*    <Text style={styles.temp}>27</Text>*/}
                {/*    <Text style={styles.description}>Sunny</Text>*/}
                {/*</View>*/}
                {days.length === 0 ? (
                        <View style={{...styles.day, alignItems: "center"}}>
                            <ActivityIndicator color="white" size="large"/>
                        </View>)
                    : (
                        days.map((day, index) =>
                            <View key={index} style={styles.day}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}>
                                    <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                                    <Fontisto style={{marginTop: 50}} name={icons[day.weather[0].main]} size={68} color="white"/>
                                </View>
                                <Text style={styles.description}>{day.weather[0].main}</Text>
                                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                            </View>)
                    )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato"
    },
    city: {
        flex: 1.2,
        justifyContent: "center",
        alignItems: "center"
    },
    cityName: {
        fontSize: 68,
        color: "white",
        fontWeight: "500"
    },
    weather: {},
    day: {
        paddingHorizontal: 20,
        width: SCREEN_WIDTH,
        rowGap: 10,

    },
    temp: {
        marginTop: 50,
        fontSize: 100,
        color: "white"
    },
    description: {
        marginTop: -30,
        fontSize: 40,
        color: "white"
    },
    tinyText: {
        fontSize: 35,
        color: "white"
    }
})

