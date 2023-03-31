import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Butten from '../Component/Butten';
const FirstPin = (params) => {

    const navigator = params.navigation;
    const { pin, userinfo } = useContext(AuthContext);
    const name = userinfo.fname +" "+ userinfo.lname;
    const [pinInput, setPinInput] = useState('');
    function checkPin() {
        if (pin === pinInput) {
            navigator.reset({
                index: 0,
                routes: [{ name: 'Root' }],
            })
            // navigator.navigate('Root');
        }else{
            setPinInput('');
            if(pinInput.length<6){
                alert('enter 6 digit pin');
            }else{
                alert('Wrong pin!!!');
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.secondContainer}>
                <View style={styles.lableContainer}>
                    <Text style={styles.welcomeText}> Welcome {name} </Text>
                </View>
                <View style={styles.lableContainer}>
                    <Text style={styles.lableText}> Enter Pin </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(pin) => setPinInput(pin)}
                        value={pinInput}
                        inputMode='numeric'
                        keyboardType='number-pad'
                        maxLength={6}
                    />
                </View>
            </View>
            <View style={styles.btnContainer}>
                <Butten continerStyle={styles.btncontinerStyle} onPress={checkPin}>Enter</Butten>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    secondContainer: {
        alignItems: "center",
    },
    lableContainer: {
        margin: 10,
        padding: 10,
    },
    welcomeText:{
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: "700"
    },
    lableText: {
        fontSize: 23,
        fontWeight: "500"
    },
    inputContainer: {
        borderColor: "#AED581",
        borderWidth: 1,
        borderRadius: 20,
        width: "50%",
        height: 60,
        justifyContent: "center",
        marginTop: 10,
        backgroundColor:"#F1F8E9",
        elevation:5,
    },
    inputField: {
        textAlign: "center",
        fontSize: 25,
    },
    btnContainer: {
        margin: 50,
        padding: 10,
        alignSelf: "center",
    },
    btncontinerStyle: {
        width: 200,
    }
});
export default FirstPin