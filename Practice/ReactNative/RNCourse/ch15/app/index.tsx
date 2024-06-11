import {Alert, Button, Text, View, Platform} from "react-native";
import * as Notifications from "expo-notifications";
import {useEffect} from "react";
import Constants from "expo-constants/src/Constants";



console.log("@@")
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Index() {
    useEffect(() => {
        async function configurePushNotifications() {
            const {status} = await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if (finalStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert('Permission required', 'Push notifications need the appropriate permissions')
                return;
            }

            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }

            const pushTokenData = await Notifications.getExpoPushTokenAsync({
                projectId: "9b79ae5b-8d44-4eb4-8bf4-6e8e6f3818fd"
            });
            console.log(pushTokenData);

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default',{
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT
                })
            }
        }

        configurePushNotifications();
    }, []);

    useEffect(() => {
        const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
            console.log('NOTIFICATION RECEIVED');
            console.log(notification);
            const userName = notification.request.content.data.userName;
            console.log(userName);
        });

        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response);
            const userName = response.notification.request.content.data.userName;
            console.log(userName);
        });

        return () => {
            subscription1.remove();
            subscription2.remove();
        }
    }, []);

    async function scheduleNotificationHandler() {
        console.log("??")
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'My first local notification',
                body: 'This is the body of the notification',
                data: {userName: 'Max'}
            },
            trigger: {seconds: 2},
        });
    }

    async function sendPushNotificationHandler() {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: 'ExponentPushToken[So-MqVGm8u1TZyg8tAMHcd]',
                title: 'Test - sent from a device!',
                body: 'This is a test!'
            })
        })

        const result = await response.json();

        console.log("result: ", result)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button title='Schedule Notification' onPress={scheduleNotificationHandler}/>
            <Button title='Send Push Notification' onPress={sendPushNotificationHandler}/>
        </View>
    );
}
