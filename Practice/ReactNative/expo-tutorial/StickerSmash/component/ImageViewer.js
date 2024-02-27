import {StyleSheet, Image} from "react-native";

export default function ImageViewer({placeHolderImageSource, selectedImage}) {
    const imageSource = selectedImage ? {uri: selectedImage} : placeHolderImageSource;
    console.log(placeHolderImageSource, selectedImage, imageSource);
    return (
        <Image source={imageSource} style={styles.image}/>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
});
