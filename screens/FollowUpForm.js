import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Butten from '../Component/Butten';
import PendingStatusSubmit from '../Component/modals/PendingStatusSubmit';
import SubmitOtpModal from '../Component/modals/SubmitOtpModal';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext';
import { print } from '../util/printPrescription';
import { COLOR } from '../util/config';

const FollowUpForm = ({ route }) => {
    // navigator
    const navigator = useNavigation();
    const [observation, setObservation] = useState('');
    const [bloodSugar, setBloodSuger] = useState(route.params.followUp.bloodSugar);
    const [bloodOxygen, setBloodOxygen] = useState(route.params.followUp.bloodOxygen);
    const [skinColor, setSkinColor] = useState(route.params.followUp.skinColor);
    const [eyeColor, setEyeColor] = useState(route.params.followUp.eyeColor);
    const [temperature, setTemperature] = useState(route.params.followUp.temperature);
    const [inflammation, setInflammation] = useState(route.params.followUp.inflammation);

    const [pendingModalVisible, setpendingModalVisible] = useState(false);
    const [otpModalVisible, setotpModalVisible] = useState(false);
    const { userinfo } = useContext(AuthContext);
    const fullname = route.params.followUp.fname + " " + route.params.followUp.lname;
    const address = route.params.followUp.street1 + "\n" + route.params.followUp.city + ", " + route.params.followUp.district;
    const gender = route.params.followUp.gender == 'M' ? "Male" : "Female"
    const healthWorkerName = userinfo.fname + " " + userinfo.lname;

    useEffect(() => {
        console.log(JSON.stringify(route.params.followUp));
    }, [])


    function alertIfFieldIsEmpty(field, value) {
        if (value.trim() === "") {
            alert('Please Enter ' + field);
            return true;
        }
        return false;

    }

    function checkEmpty() {
        // check if ant field is empty or not
        if (bloodSugar !== null && alertIfFieldIsEmpty('Blood Sugar', bloodSugar)) {
            return true
        } else if (bloodOxygen !== null && alertIfFieldIsEmpty('Blood Oxygen', bloodOxygen)) {
            return true
        } else if (skinColor !== null && alertIfFieldIsEmpty('Skin Color', skinColor)) {
            return true
        } else if (eyeColor !== null && alertIfFieldIsEmpty('Eye Color', eyeColor)) {
            return true
        } else if (temperature !== null && alertIfFieldIsEmpty('Temprature', temperature)) {
            return true
        } else if (inflammation !== null && alertIfFieldIsEmpty('Inflammation', inflammation)) {
            return true
        }
        return false;
    }


    function submitFollowUps() {
        if (!checkEmpty()) {
            // Enter submit logic
            route.params.followUp.observation = observation;
            route.params.followUp.status = 1;
            route.params.followUp.bloodSugar = bloodSugar
            route.params.followUp.bloodOxygen = bloodOxygen
            route.params.followUp.eyeColor = eyeColor
            route.params.followUp.skinColor = skinColor
            route.params.followUp.temperature = temperature
            route.params.followUp.inflammation = inflammation
            setotpModalVisible(true);
        }
    }


    function openOrClosePedingModal(flag) {
        setpendingModalVisible(flag);
    }

    function openOrCloseSubmitOTPModal(flag) {
        setotpModalVisible(flag);
    }

    function printPdf() {
        print(fullname, gender, route.params.followUp.prescription, healthWorkerName);
    }
    return (
        <View style={styles.mainContainer}>
            <PendingStatusSubmit openOrCloseModal={openOrClosePedingModal} followUp={route.params.followUp} visible={pendingModalVisible} />
            <SubmitOtpModal openOrCloseModal={openOrCloseSubmitOTPModal} followUp={route.params.followUp} visible={otpModalVisible} />

            <ScrollView>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => {
                        navigator.goBack();
                    }}>
                        <Ionicons name="arrow-back-circle-sharp" size={29} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5, alignItems: "center" }} onPress={() => { printPdf() }}>
                        <Entypo name="print" size={24} color="black" />
                        <Text style={styles.printLable}>prescription</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.formContainer}>
                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Name</Text>
                            </View>
                            <View>
                                <Text >{fullname}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Gender</Text>
                            </View>
                            <View>
                                <Text >{gender}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Address</Text>
                            </View>
                            <View>
                                <Text style={styles.addressText} multiline={4}>{address}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Instructions</Text>
                            </View>
                            <View  >
                                <Text style={styles.instructionText}>{route.params.followUp.instruction}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Prescription</Text>
                            </View>
                            <View >
                                <Text style={styles.prescriptionText}>{route.params.followUp.prescription}</Text>
                            </View>
                        </View>

                        {bloodSugar !== null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Blood Sugar</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setBloodSuger(value)
                                    }
                                    }
                                    value={bloodSugar}
                                />
                            </View>
                        </View>}

                        {bloodOxygen !== null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Blood Oxygen</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setBloodOxygen(value)
                                    }
                                    }
                                    value={bloodOxygen}
                                />
                            </View>
                        </View>}

                        {skinColor !== null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Skin Color</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setSkinColor(value);
                                    }
                                    }
                                    value={skinColor}
                                />
                            </View>
                        </View>}

                        {eyeColor !== null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Eye Color</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setEyeColor(value)
                                    }
                                    }
                                    value={eyeColor}
                                />
                            </View>
                        </View>}

                        {temperature !== null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Temperature</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setTemperature(value);
                                    }
                                    }
                                    value={temperature}
                                />
                            </View>
                        </View>}

                        {inflammation!==null && <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Inflammation</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    maxLength={16}
                                    onChangeText={(value) => {
                                        setInflammation(value);
                                    }
                                    }
                                    value={inflammation}
                                />
                            </View>
                        </View>}

                        <View style={styles.fieldContainer}>
                            <View style={styles.lableContainer}>
                                <Text style={styles.textLable}>Observation</Text>
                            </View>
                            <View style={styles.observationContainer}>
                                <TextInput
                                    multiline={true}
                                    style={styles.observationInput}
                                    onChangeText={(observation) => { setObservation(observation) }}
                                />
                            </View>
                        </View>


                    </View>
                    <View style={styles.buttenContainer}>
                        <Butten onPress={submitFollowUps} >submit</Butten>
                        <Butten onPress={() => { openOrClosePedingModal(true) }} >pending</Butten>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOR.defaultBackGroundColor,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    backArrowContainer: {
        margin: 5
    },
    lableContainer: {
        width: "30%",
    },
    textLable: {
        // Lable Style
        fontWeight: "600",
        fontSize: 14,
    },
    printLable: {
        padding: 5,
        marginRight: 3,
    },
    formContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 5,

    },
    fieldContainer: {
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "flex-start",
    },
    observationContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.inputBorderColor,
        padding: 4,
        width: 250,
        height: 160,
        backgroundColor: COLOR.inputBackGroundColor,
        elevation: 2,
    },
    observationInput: {
        flex: 1,
        textAlign: "left",
        textAlignVertical: "top",
        paddingHorizontal: 5,
        paddingVertical: 4,
    },
    buttenContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    instructionText: {
        overflow: "scroll",
        textAlign: "justify",
        maxWidth: "80%",
        minWidth: "45%",
    },
    addressText: {
        minWidth: "45%",
        maxWidth: "80%",
        textAlign: "justify",
    },
    prescriptionText: {
        minWidth: "45%",
        maxWidth: "80%",
        textAlign: "justify",

    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.inputBorderColor,
        padding: 5,
        minWidth: "40%",
        maxWidth: "80%",
        backgroundColor: COLOR.inputBackGroundColor,
        elevation: 2,
    },
    input: {
        paddingHorizontal: 5,
    }
});


export default FollowUpForm
