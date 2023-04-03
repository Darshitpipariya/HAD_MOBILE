import { Linking } from "react-native";


export const dialCall = (number) => {
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    }
    else {
        phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
};