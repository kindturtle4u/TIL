import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Platform} from 'react-native';
import Button from "./component/Button";
import * as ImagePicker from 'expo-image-picker';
import {useRef, useState} from "react";
import IconButton from "./component/IconButton";
import CircleButton from "./component/CircleButton";
import EmojiPicker from "./component/EmojiPicker";
import EmojiList from "./component/EmojiList";
import EmojiSticker from "./component/EmojiSticker";
import ImageViewer from "./component/ImageViewer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

const PlaceholderImage = require('./assets/images/background-image.png')
export default function App() {
    const imageRef = useRef();

    const [status, requestPermission] = MediaLibrary.usePermissions();

    console.log("status: ", status)
    if (status == null) {
        requestPermission();
    }

    console.log("PlaceholderImage", PlaceholderImage)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState(null);

    const onRest = () => {
        setShowAppOptions(false);
    }

    const onAddSticker = () => {
        setIsModalVisible(true);
    }

    const onModalClose = () => {
        setIsModalVisible(false);
    }

    const onSaveImageAsync = async () => {
        console.log(Platform)
        if (Platform.OS !== 'web') {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 440,
                    quality: 1,
                });
                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    alert('Saved!');
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const dataUrl = await domtoimage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                });

                let link = document.createElement('a');
                link.download = 'sticker-smash.jpeg';
                link.href = dataUrl;
                link.click();
            } catch (e) {
                console.log(e);
            }
        }
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
                </EmojiPicker>
                <View style={styles.imageContainer}>
                    <View ref={imageRef} collapsable={false}>
                        <ImageViewer
                            placeHolderImageSource={PlaceholderImage}
                            selectedImage={selectedImage}
                        />
                        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
                    </View>
                </View>

                {showAppOptions ? (
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton icon="refresh" label="Reset" onPress={onRest}/>
                            <CircleButton onPress={onAddSticker}/>
                            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
                        </View>
                    </View>
                ) : (
                    <View style={styles.footerContainer}>
                        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
                        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                    </View>
                )}
                <StatusBar style="light"/>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        padding: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center'
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row'
    }
});
