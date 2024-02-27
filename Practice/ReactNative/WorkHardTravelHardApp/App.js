import {PixelRatio, TextInput} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "./color";
import {useEffect, useRef, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fontisto, MaterialIcons} from '@expo/vector-icons';

const STORAGE_KEY = "@toDos"
const STORAGE_HEADER_KEY = "@header"


export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState("");
    const [toDos, setToDos] = useState({});
    const [selectedKey, setSelectedKey] = useState(null);
    const textInput = useRef();
    const travel = async () => {
        setWorking(false);
        await AsyncStorage.setItem(STORAGE_HEADER_KEY, JSON.stringify(false))
    }
    const work = async () => {
        setWorking(true);
        await AsyncStorage.setItem(STORAGE_HEADER_KEY, JSON.stringify(true))
    }

    const loadToDos = async () => {
        const s = await AsyncStorage.getItem(STORAGE_KEY)

        if (s) {
            setToDos(JSON.parse(s))
        }
    }

    useEffect(() => {
        loadToDos();
    }, []);

    const loadHeaders = async () => {
        const s = await AsyncStorage.getItem(STORAGE_HEADER_KEY)
        if (s) {
            setWorking(JSON.parse(s))
        }
    }

    useEffect(() => {
        loadHeaders()
    }, []);

    const saveToDo = async (toSave) => {
        const s = JSON.stringify(toSave);
        await AsyncStorage.setItem(STORAGE_KEY, s)
    }
    const addToDo = async () => {
        if (text === "") {
            return;
        }

        let newToDos = null;
        if (selectedKey) {
            newToDos = {...toDos, [selectedKey]: {text, working, done: toDos[selectedKey].done }}
        } else {
            newToDos = {...toDos, [Date.now()]: {text, working, done: false}}
        }



        setToDos(newToDos);
        await saveToDo(newToDos);
        setText("");
        setSelectedKey(null);
    }

    const modifyToDo = async (key) => {
        setSelectedKey(key);
        setText(toDos[key].text);
        textInput.current.focus();
    }

    const deleteToDo = async (key) => {
        Alert.alert(
            "Do you remove toDo?",
            "are you sure",
            [
                {text: "cancel"},
                {
                    text: "ok",
                    onPress: async () => {
                        const newToDos = {...toDos};
                        delete newToDos[key]

                        setToDos(newToDos);
                        await saveToDo(newToDos);
                    }
                }
            ]
        )
    }

    const doneToDo = async (key) => {
        const newToDos = {...toDos, [key]: {...toDos[key], done: !toDos[key].done}};

        console.log(newToDos)
        setToDos(newToDos);
        await saveToDo(newToDos);
    }
    const onChangeText = (payload) => {
        setText(payload);
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto"/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={work}>
                        <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={travel}>
                        <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput style={styles.input}
                               value={text}
                               onChangeText={onChangeText}
                               onSubmitEditing={addToDo}
                               returnKeyType="done"
                               ref={textInput}
                               placeholder={working ? "Add a To Do" : "Where do you want to go?"}></TextInput>
                    <ScrollView>
                        {Object.keys(toDos).map(key =>
                            toDos[key].working === working ?
                                <View  style={styles.toDo} key={key}>
                                    <Text style={{...styles.toDoText, textDecorationLine: toDos[key].done? "line-through" : "none" }}>{toDos[key].text}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity onPress={() => modifyToDo(key)}>
                                            <MaterialIcons name="update" size={18} color="white"
                                                           style={{marginRight: 10}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => doneToDo(key)}>
                                            <MaterialIcons name="done" size={18} color="white"
                                                           style={{marginRight: 10}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteToDo(key)}>
                                            <Fontisto name="trash" size={18} color="white"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : null
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}


export const getFontSize = (size) => {
    /*
    - 230720: `pixel(size)` 말고, size를 fontScale로 나눈다.
    - 폰트사이즈 참고 아티클: https://muhammadrafeh.medium.com/make-responsive-react-native-text-for-any-device-f8301b006694
    */
    return size / PixelRatio.getFontScale();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 50
    },
    btnText: {
        fontSize: getFontSize(44),
        fontWeight: "600",
    },
    input: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
        fontSize: getFontSize(18),
    },
    toDo: {
        backgroundColor: theme.toDoBg,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    toDoText: {
        color: "white",
        fontSize: getFontSize(16),
        fontWeight: "500",

    }
});
