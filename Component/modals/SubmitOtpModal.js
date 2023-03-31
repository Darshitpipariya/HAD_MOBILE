import { View, Text, Modal, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Butten from '../Butten';
import { useNavigation } from '@react-navigation/native'
import { FollowUpContext } from '../../context/FollowUpContext';
const SubmitOtpModal = (params) => {
    // navigator
    const navigator = useNavigation();
    const { UpdateFollowUpInDatabase }=useContext(FollowUpContext);
    const [otp, setOtp] = useState('');
    
    useEffect(() => {
        console.log("OTP Entered"+otp);
    }, [otp])

    function checkOtpAndSubmit(){
        if (otp === params.followUp.secretKey){
            console.log('Otp Matched\n');
            const Fulldate = new Date();
            const date=Fulldate.getDate();
            const month=Fulldate.getMonth()+1;
            const year=Fulldate.getFullYear();
            params.followUp.actualDateOfFollowUp = year+"-"+(month>=10?month:("0"+month))+"-"+date;
            params.followUp.actualTimeOfFollowUp = Fulldate.toLocaleTimeString();
            params.followUp.status = 1;//status 1 for submitted;
            params.followUp.mystatus = 1;
            console.log(JSON.stringify(params.followUp));
            console.log("Update in Databases\n");
            UpdateFollowUpInDatabase(params.followUp);
            console.log("Followup updated\n");
            

            params.openOrCloseModal(false)
            navigator.goBack();
        }else{
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
                            />
                        </View>
                        <View style={styles.buttenContainer}>
                            <View style={styles.btnContainer}>
                                <Butten onPress={ checkOtpAndSubmit }>submit</Butten>
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
        marginTop:10,

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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C5E1A5",
        padding: 4,
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

export default SubmitOtpModal