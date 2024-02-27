import React from "react";
import {Platform, View, StatusBar, SafeAreaView} from "react-native";

export function SafeAreaViewWithAndroid({ children }) {
    if (Platform.OS === "ios") {
        return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
    }
    if (Platform.OS === "android") {
        return <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>{children}</View>;
    }
}
