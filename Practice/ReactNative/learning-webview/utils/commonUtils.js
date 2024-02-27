import {PixelRatio} from "react-native";

export const getFontSize = (size) => {
    /*
    - 230720: `pixel(size)` 말고, size를 fontScale로 나눈다.
    - 폰트사이즈 참고 아티클: https://muhammadrafeh.medium.com/make-responsive-react-native-text-for-any-device-f8301b006694
    */
    return size / PixelRatio.getFontScale();
};

