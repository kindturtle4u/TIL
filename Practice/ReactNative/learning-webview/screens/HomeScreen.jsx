import WebView from "react-native-webview";
import {SafeAreaViewWithAndroid} from "../components/SafeAreaViewWithAndroid";

const url = "http://172.16.80.47:32080/fst/mber/actionMain.fas";
export default function HomeScreen(props) {
    console.log(props)
    return (
        <WebView
            //style={styles.container}
            source={{uri: url}}
        />
    );
}
