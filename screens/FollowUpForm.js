import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, {  useEffect, useState } from 'react'
import Butten from '../Component/Butten';
import Fields from '../Component/Fields';
import PendingStatusSubmit from '../Component/modals/PendingStatusSubmit';
import SubmitOtpModal from '../Component/modals/SubmitOtpModal';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const FollowUpForm = ({ route }) => {
    // navigator
    const navigator = useNavigation();
    const fullname = route.params.followUp.fname + " " + route.params.followUp.lname;
    const address = route.params.followUp.street1 + "\n" + route.params.followUp.city + ", " + route.params.followUp.district;
    const [observation, setObservation] = useState('');
    const [fieldList, setFieldList] = useState([]);
    const [fieldValueList, setFieldValueList] = useState([]);
    const [pendingModalVisible, setpendingModalVisible] = useState(false);
    const [otpModalVisible, setotpModalVisible] = useState(false);

    useEffect(() => {
        getFieldList();
        console.log(JSON.stringify(route.params.followUp));
    }, [])

    // create the field list from string and create value list set it to state
    function getFieldList() {
        const array = route.params.followUp.fields.split(",");
        const values = [];
        for (let i = 0; i < array.length; i++) {
            values.push("");
        }
        setFieldValueList(values);
        setFieldList(array);
    }

    // for setting the value of fleld value for field at index in fieldValueList state
    function setFieldValue(index, value) {
        setFieldValueList((fieldValueList) => {
            fieldValueList[index] = value;
            return fieldValueList;
        });
        console.log(fieldValueList);
    }

    function alertIfFieldIsEmpty(field, value) {
        if (value.trim() === "") {
            alert('Please Enter ' + field);
            return true;
        }
        return false;
    }

    function checkEmpty() {
        for (let i = 0; i < fieldValueList.length; i++) {
            // check if ant field is empty or not
            if (alertIfFieldIsEmpty(fieldList[i], fieldValueList[i])) {
                return true
            }
        }
        // check for obervatrion is empty or not
        // return alertIfFieldIsEmpty("observation", observation);
        return false;
    }


    function submitFollowUps() {
        if (!checkEmpty()) {
            // Enter submit logic
            route.params.followUp.observation = observation;
            route.params.followUp.fieldsValue = fieldValueList.join(',');
            route.params.followUp.status = 1;
            setotpModalVisible(true);
        }
    }

    // async function printPrescription() {
    //     const today = new Date();
    //     const Todaydate = today.getDate() + "-" + (today.getMonth() > 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" + today.getFullYear();

    //     const text = `\n\tDate : ${Todaydate}\n\n\tName : ${fullname}\n\n\tPrescription : ${route.params.followUp.prescription}\n\n`;
    //     console.log("Prescription\n"+text);
    //     await saveFile(text);
    // }

    function openOrClosePedingModal(flag) {
        setpendingModalVisible(flag);
    }

    function openOrCloseSubmitOTPModal(flag) {
        setotpModalVisible(flag);
    }
    return (
        <View style={styles.mainContainer}>
            <PendingStatusSubmit openOrCloseModal={openOrClosePedingModal} followUp={route.params.followUp} visible={pendingModalVisible} />
            <SubmitOtpModal openOrCloseModal={openOrCloseSubmitOTPModal} followUp={route.params.followUp} visible={otpModalVisible} />

            <ScrollView>
                <TouchableOpacity style={styles.backArrowContainer} onPress={() => {
                    navigator.goBack();
                }}>
                    <Ionicons name="arrow-back-circle-sharp" size={29} color="black" />
                </TouchableOpacity>
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

                        <Fields
                            lableContainer={styles.lableContainer}
                            textLable={styles.textLable}
                            setFieldValue={setFieldValue}
                            fieldValueList={fieldValueList}
                            fieldList={fieldList}
                        />


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
                        {/* <Butten onPress={() => { printPrescription }}></Butten> */}
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
        backgroundColor: "#efefef",
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
        borderColor: "#C5E1A5",
        padding: 4,
        width: 250,
        height: 160,
        backgroundColor: "#F1F8E9",
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

    }
});


export default FollowUpForm
