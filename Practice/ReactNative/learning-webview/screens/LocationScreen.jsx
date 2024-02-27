import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import useInterval from "../hooks/useInterval";

export default function LocationScreen(props) {
    const [locationGranted, setLocationGranted] = useState(true);
    const [coords, setCoords] = useState({
        latitude: null,
        longitude: null,
        timestamp: null,
    })
    const getLocation = async () => {
        const {granted} = await Location.requestForegroundPermissionsAsync();

        if (!granted) {
            setLocationGranted(false);
        }

        const locationObject = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        setCoords({
            latitude: locationObject.coords.latitude,
            longitude: locationObject.coords.longitude,
            timestamp: locationObject.timestamp
        })
    }

    useInterval(getLocation, 15000)
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <Text>위도: {coords.latitude}</Text>
            <Text>경도: {coords.longitude}</Text>
            <Text>가져온시간:{new Date(coords.timestamp).toLocaleString()} </Text>
        </View>
    );
}
