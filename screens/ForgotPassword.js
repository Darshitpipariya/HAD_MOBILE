import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Butten from '../Component/Butten'
import { getOtp, validateOtp } from '../util/http';

const ForgotPassword = (props) => {

    const [otp, setOtp] = useState('');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false)
    const navigation = props.navigation;
    
    useEffect(()=>{
        setVisible(false);
    },[])

    async function submituserID() {
        if (username.trim() === '') {
            alert("Enter Username");
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


    async function submitOtp(){
        if(otp.trim()===''){
            alert("Enter OTP");
        }else{
            try {
                const response=await validateOtp(username,otp)
                console.log("SECRET "+response.headers.secret);
                // handle visible
                navigation.navigate("Set New Password",
                {
                    username: username,
                    secret: response.headers.secret,
                });
                setVisible(false);
                setOtp('');
                setUsername('');
            } catch (error) {
                msg=''
                if(!error?.response){
                    msg='server unreachable';
                }else{
                    msg='Invalid Otp';
                }
                setVisible(false);
                setOtp('');
                setUsername('');
                alert(msg);
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
    mainContainer:{
        margin:"15%",
        padding: "10%", 
        flex: 1, 
        justifyContent: "center",
    },
    otpContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C5E1A5",
        padding: 4,
        margin: 10,
        backgroundColor: "#F1F8E9",
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