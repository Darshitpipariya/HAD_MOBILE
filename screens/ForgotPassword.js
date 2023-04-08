import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Butten from '../Component/Butten'
import { getOtp, validateOtp } from '../util/http';
import { COLOR } from '../util/config';

const ForgotPassword = (props) => {

    const [otp, setOtp] = useState('');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false)
    const navigation = props.navigation;

    useEffect(() => {
        setVisible(false);
    }, [])

    async function submituserID() {
        if (username.trim() === '') {
            alert("Enter Username");
        }else if(!username.trim().startsWith("FHW")){
            alert("Enter valid username");
            setUsername('');
        } else {
            try {

                const response = await getOtp(username)
                setVisible(true);
            }
            catch (error) {
                msg = ''
                if (!error?.response) {
                    msg = "Server Unreachable"
                } else {
                    msg = "Invalid username"
                }
                alert(msg);
            }
        }
    }


    async function submitOtp() {
        if (otp.trim() === '') {
            alert("Enter OTP");
        } else {
            try {
                const response = await validateOtp(username, otp);
                if (response.data == '0') {
                    console.log("SECRET " + response.headers.secret);
                    // handle visible
                    navigation.navigate("Set New Password",
                        {
                            username: username,
                            secret: response.headers.secret,
                        });
                    setVisible(false);
                    setOtp('');
                    setUsername('');
                } else if (response.data == '1') {
                    msg = 'Invalid Otp. Try again';
                    setVisible(true);
                    setOtp('');
                    alert(msg);
                } else if (response.data = '2') {
                    msg = 'Otp Expired try again';
                    setVisible(false);
                    setOtp('');
                    setUsername('');
                    alert(msg);
                }

            } catch (error) {
                msg = '';
                if(error?.response){
                    msg = 'server unreachable';
                    setVisible(false);
                    setOtp('');
                    setUsername('');
                    alert(msg);
                }else{
                    msg = 'Invalid User';
                    setVisible(false);
                    setOtp('');
                    setUsername('');
                    alert(msg);
                }
                

            }
        }
    }



    return (
        <View style={styles.mainContainer}>

            <View style={styles.otpContainer}>
                <TextInput

                    style={styles.otpInput}
                    onChangeText={(username) => { setUsername(username) }}
                    value={username}
                    placeholder='USERNAME'
                    editable={!visible}
                />
            </View>
            {visible && <View style={styles.otpContainer}>
                <TextInput

                    style={styles.otpInput}
                    onChangeText={(otp) => { setOtp(otp) }}
                    value={otp}
                    placeholder='Enter OTP'
                />
            </View>}
            <View styles={{ margin: 5, padding: 5, }}>
                <Butten onPress={!visible ? submituserID : submitOtp} >  Enter </Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: "15%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLOR.defaultBackGroundColor
    },
    otpContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.inputBorderColor,
        padding: 4,
        margin: 10,
        backgroundColor: COLOR.inputBackGroundColor,
        elevation: 2,
    },
    otpInput: {
        textAlign: "center",
        textAlignVertical: "center",
        paddingHorizontal: 5,
        paddingVertical: 4,
    }
});

export default ForgotPassword