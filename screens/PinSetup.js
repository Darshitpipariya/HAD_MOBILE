import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Butten from '../Component/Butten';
import { COLOR } from '../util/config';
import { MaterialIcons } from '@expo/vector-icons';

export default function PinSetup(props) {
    const { storePin, clearCredential } = useContext(AuthContext);
    const [enterStatus, setEnterStatus] = useState(false);
    const [pin, setPin] = useState('');
    const [pinInput, setPinInput] = useState('');
    const [passVisible, setPassVisible] = useState(false);
    const navigation = props.navigation;

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            clearCredential();
        });
        return unsubscribe;
    }, [])

    function savefirstPin() {
        if (pinInput.length < 6) {
            alert("Enter 6 digit pin");
        } else {
            setPin(pinInput);
            setPinInput('');
            setEnterStatus(true);
            setPassVisible(false);
        }

    }
    function savefinalPin() {
        if (pinInput !== pin) {
            alert("Pin doesn't match");
            setEnterStatus(false);
            setPin('');
            setPinInput('');
        } else {
            console.log("pin to be stored" + pin);
            storePin(pin);
        }

    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.secondContainer}>
                <View >
                    {!enterStatus && <Text style={styles.lableText}> Enter Pin </Text>}
                    {enterStatus && <Text style={styles.lableText}> Re-Enter Pin</Text>}
                </View>
                <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(pin) => setPinInput(pin)}
                            maxLength={6}
                            value={pinInput}
                            inputMode='numeric'
                            keyboardType='number-pad'
                            secureTextEntry={!passVisible}
                        />
                    <TouchableOpacity onPress={() => { setPassVisible(!passVisible) }} style={{ paddingHorizontal: 10, }}>
                        {passVisible ? <MaterialIcons name="visibility" size={24} color="black" />
                            : <MaterialIcons name="visibility-off" size={24} color="black" />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <Butten continerStyle={styles.btncontinerStyle} onPress={!enterStatus ? savefirstPin : savefinalPin}>Enter</Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 100,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: COLOR.defaultBackGroundColor,
    },
    secondContainer: {
        alignItems: "center",
    },
    lableContainer: {
        margin: 10,
        padding: 10,
    },
    lableText: {
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: "700"
    },
    inputContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLOR.inputBorderColor,
        borderWidth: 1,
        borderRadius: 20,
        width: "50%",
        height: 60,
        marginTop: 10,
        backgroundColor: COLOR.inputBackGroundColor,
    },
    inputField: {
        flex: 1,
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