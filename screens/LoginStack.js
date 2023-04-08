import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import ErrorToast from '../Component/ErrorToast';
import { COLOR } from '../util/config';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login(props) {

    const navigation = props.navigation;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login ,userTocken, isOffline } = useContext(AuthContext);
    const [errMsg, setErrorMsg] = useState('');
    const [passVisible, setPassVisible] = useState(false);


    useEffect(() => {
        if (userTocken !== null) {
            navigation.navigate('SetUp Pin');
        }
    }, [])

    function customToast(msg, time) {
        console.log(msg);
        setErrorMsg(msg);
        setTimeout(() => {
            setErrorMsg('');
        }, time);
    }
    async function checkUserIdandPassword() {
        if (!isOffline) {

            if (username.trim() === "" && password.trim() === "") {
                customToast("Username and Password is required", 1000);
            } else if (username.trim() === "") {
                customToast("Username is required", 1000);
            } else if (password.trim() === "") {
                customToast("Password is required", 1000);
            }
            else {
                try {
                    await login(username, password);
                } catch (error) {
                    console.log(JSON.stringify(error));
                    msg = ''
                    if (!error?.response) {
                        msg = "Server Unreachable"
                    } else {
                        msg = "Invalid Credential"
                    }
                    Alert.alert(msg);
                }
            }
        } else {
            customToast("Internet Is Not Avalible", 2000);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.loginLableContainer}>
                    <Text style={styles.loginText}>Login</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <View style={styles.inputView}>
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" ,alignItems:"center"}}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password."
                            placeholderTextColor="#003f5c"
                            secureTextEntry={!passVisible}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={()=>{setPassVisible(!passVisible)}} style={{paddingHorizontal:10,}}>
                            {passVisible ? <MaterialIcons name="visibility" size={24} color="black" />
                                : <MaterialIcons name="visibility-off" size={24} color="black" />}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={checkUserIdandPassword}>
                    <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgot_button} onPress={() => { navigation.navigate('Forgot Password'); }}>
                    <Text >Forgot Password?</Text>
                </TouchableOpacity>

            </View>
            <View style={{ backgroundColor:COLOR.defaultBackGroundColor }}>
                <ErrorToast msg={errMsg} visible={errMsg !== ''} />
            </View>
        </View>);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.defaultBackGroundColor,
        justifyContent: "center",
        alignItems: "center"
    },
    loginLableContainer: {
        margin: 10,
        padding: 8
    },
    loginText: {
        fontWeight: "bold",
        fontSize: 35,
        alignSelf: "center",
    },
    inputView: {
        backgroundColor: COLOR.inputBackGroundColor,
        borderColor: COLOR.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        width: 300,
        height: 45,
        marginBottom: 15,
        alignSelf: "center",
        alignItems: "stretch",
    },
    TextInput: {
        flex:1,
        padding: 10,
        marginLeft: 10,
        textAlignVertical: "center",

    },
    forgot_button: {
        marginVertical: 5,
        height: 30,
        alignSelf: "center"
    },
    loginBtn:
    {
        width: 300,
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: COLOR.buttenBackGroundColor,
        borderWidth: 1,
        borderColor: COLOR.buttenBorderColor,
    }

});