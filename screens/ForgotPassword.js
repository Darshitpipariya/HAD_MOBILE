import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Butten from '../Component/Butten'
const ForgotPassword = () => {
    const [otp, setOtp] = useState('');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false)
    
    function handleSubmit(){
        if(visible){
            setVisible(false)
        }else{
            setVisible(true)
        }
    }



    return (
        <View style={{ padding: "10%", flex: 1, justifyContent: "center", }}>

            <View style={styles.otpContainer}>
                <TextInput
                    maxLength={6}
                    style={styles.otpInput}
                    onChangeText={(username) => { setUsername(username) }}
                    value={username}
                    placeholder='USERNAME'
                />
            </View>
            {visible &&  <View style={styles.otpContainer}>
                <TextInput
                    maxLength={6}
                    style={styles.otpInput}
                    onChangeText={(otp) => { setOtp(otp) }}
                    value={otp}
                    placeholder='Enter OTP'
                />
            </View>}
            <View styles={{ margin: 5, padding: 5, }}>
                <Butten onPress={handleSubmit} >  Enter</Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    otpContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C5E1A5",
        padding: 4,
        margin:10,
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