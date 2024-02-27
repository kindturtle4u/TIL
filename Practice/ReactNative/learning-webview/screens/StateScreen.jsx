import {Text, View} from "react-native";
import {useState} from "react";

export default function StateScreen(props) {
    return (
        <View style={{backgroundColor: "white", flex: 1}}>
                <Text>위도: </Text>
                <Text>경도: </Text>
                <Text>인터넷상태: </Text>
        </View>
    );
}
