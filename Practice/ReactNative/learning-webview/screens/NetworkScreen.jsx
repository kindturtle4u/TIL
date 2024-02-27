import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';

export default function NetworkScreen(props) {
    const netInfo = NetInfo.useNetInfo()
    console.log(netInfo)


    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <Text>Type: {netInfo.type}</Text>
            <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
        </View>
    );
}
