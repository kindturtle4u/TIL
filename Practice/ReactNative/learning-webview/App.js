import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaViewWithAndroid} from "./components/SafeAreaViewWithAndroid";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Fontisto, MaterialIcons} from '@expo/vector-icons';
import HomeScreen from "./screens/HomeScreen";
import StateScreen from "./screens/StateScreen";
import LocationScreen from "./screens/LocationScreen";
import NetworkScreen from "./screens/NetworkScreen";

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <SafeAreaViewWithAndroid>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home" //탐색기를 처음 로드할 때 렌더링할 경로의 이름입니다.
                    detachInactiveScreens={false} //메모리를 절약하기 위해 비활성 화면을 뷰 계층 구조에서 분리해야 하는지 여부를 나타내는 데 사용되는 부울입니다. 이를 통해 반응 네이티브 화면 과의 통합이 가능해집니다 . 기본값은 true.
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                            title: '홈',
                            tabBarIcon: ({color, size}) => (
                                <MaterialIcons name="home" color={color} size={size}/>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="location"
                        component={LocationScreen}
                        options={{
                            title: '위치',
                            tabBarIcon: ({color, size}) => (
                                <MaterialIcons name="my-location" color={color} size={size}/>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="network"
                        component={NetworkScreen}
                        options={{
                            title: '네트워크',
                            tabBarIcon: ({color, size}) => (
                                <MaterialIcons name="network-check" color={color} size={size}/>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaViewWithAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
