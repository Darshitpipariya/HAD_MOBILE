import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { COLOR } from '../util/config';

const Logout = () => {
    const { logout, isOffline,clearCredential } = useContext(AuthContext);



    function removeUser() {
        try {
            !isOffline ? logout() : ToastAndroid.show('Your Device is Offline', ToastAndroid.SHORT);    
        } catch (error) {
            console.log("ERROR "+error);
        }
        
    }

    return (
        <View>
            <TouchableOpacity  style={styles.Btn} onPress={removeUser}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Btn: {
        marginHorizontal:2,
        width: 100,
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: COLOR.buttenBackGroundColor,
        elevation: 4,
    },
    text: {
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center",
        color: "#ffffff"
    }
});
export default Logout