import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Butten from '../Butten';
import { useNavigation } from '@react-navigation/native'
import { FollowUpContext } from '../../context/FollowUpContext';
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR } from '../../util/config';
const SubmitOtpModal = (params) => {
    // navigator
    const navigator = useNavigation();
    const { UpdateFollowUpInDatabase } = useContext(FollowUpContext);
    const [otp, setOtp] = useState('');
    const [passVisible, setPassVisible] = useState(false);

    useEffect(() => {
        console.log("OTP Entered" + otp);
    }, [otp])

    function checkOtpAndSubmit() {
        if (otp === params.followUp.secretKey) {

            console.log('Otp Matched\n');
            const Fulldate = new Date();
            const date = Fulldate.getDate();
            const month = Fulldate.getMonth() + 1;
            const year = Fulldate.getFullYear();
            const time = Fulldate.toLocaleTimeString().split(" ");
            let hr = Fulldate.getHours();
            const min = Fulldate.getMinutes() < 10 ? "0" + Fulldate.getMinutes() : Fulldate.getMinutes();
            const sec = Fulldate.getSeconds() < 10 ? "0" + Fulldate.getSeconds() : Fulldate.getSeconds();
            if (time[time.length - 1] === 'PM') {
                hr += 12;
            }
            hr = hr < 10 ? "0" + Fulldate.getHours() : Fulldate.getHours()

            params.followUp.actualDateOfFollowUp = year + "-" + (month >= 10 ? month : ("0" + month)) + "-" + ((date < 10) ? "0" + date : date);
            params.followUp.actualTimeOfFollowUp = hr + ":" + min + ":" + sec;
            params.followUp.observation = params.followUpValues.observation;
            params.followUp.bloodSugar = params.followUpValues.bloodSugar;
            params.followUp.bloodOxygen = params.followUpValues.bloodOxygen;
            params.followUp.eyeColor = params.followUpValues.eyeColor;
            params.followUp.skinColor = params.followUpValues.skinColor;
            params.followUp.temperature = params.followUpValues.temperature;
            params.followUp.inflammation = params.followUpValues.inflammation;
            params.followUp.status = 1;//status 1 for submitted;
            params.followUp.mystatus = 1;
            console.log(JSON.stringify(params.followUp));
            console.log("Update in Databases\n");
            UpdateFollowUpInDatabase(params.followUp);
            console.log("Followup updated\n");
            params.openOrCloseModal(false)
            navigator.goBack();
        } else {
            setOtp('');
            alert('Wrong OTP');
        }
    }


    return (
        <View>
            <Modal animationType="fade" transparent={true} visible={params.visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.otpLable}> OTP FOR HEALTH RECORD {params.followUp.hrId} </Text>
                        <View style={styles.otpContainer}>
                            <TextInput
                                maxLength={6}
                                style={styles.otpInput}
                                onChangeText={(otp) => { setOtp(otp) }}
                                value={otp}
                                secureTextEntry={!passVisible}
                            />
                            <TouchableOpacity onPress={() => { setPassVisible(!passVisible) }} style={{ paddingHorizontal: 10, }}>
                                {passVisible ? <MaterialIcons name="visibility" size={24} color="black" />
                                    : <MaterialIcons name="visibility-off" size={24} color="black" />}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttenContainer}>
                            <View style={styles.btnContainer}>
                                <Butten onPress={checkOtpAndSubmit}>submit</Butten>
                            </View>
                            <View style={styles.btnContainer}>
                                <Butten onPress={() => { params.openOrCloseModal(false) }}>cancel</Butten>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContainer: {
        borderRadius: 15,
        padding: 25,
        backgroundColor: "#FAFAFA",
        elevation: 80,
    },
    buttenContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,

    },
    btnContainer: {
        margin: 10,
    },
    otpLable: {
        textAlign: "center",
        margin: 5,
        padding: 5,
        fontWeight: "500",
        fontSize: 18,
    },
    otpContainer: {
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.inputBorderColor,
        padding: 4,
        backgroundColor: COLOR.inputBackGroundColor,
        elevation: 2,
    },
    otpInput: {
        flex:1,
        textAlign: "center",    
        textAlignVertical: "center",
        paddingHorizontal: 5,
        paddingVertical: 4,
    }
});

export default SubmitOtpModal