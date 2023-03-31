import { View, Text, Modal, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Butten from '../Butten';
import { useNavigation } from '@react-navigation/native'
import { FollowUpContext } from '../../context/FollowUpContext';
const PendingStatusSubmit = (params) => {
    // navigator
    const navigator = useNavigation();
    const { UpdateFollowUpInDatabase } = useContext(FollowUpContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("Pending Message "+message);
    }, [message])

    function addMessageAndUpdateFollowUp() {
        params.followUp.observation = '';
        params.followUp.fieldsValue = '';
        params.followUp.reasonIfDelayed = message.trim();
        params.followUp.status=0;
        params.followUp.mystatus = 2;//status 1 for submitted;
        console.log("Update in Databases\n")
        console.log(params.followUp);        
        UpdateFollowUpInDatabase(params.followUp);
        console.log("Updated\n");
        params.openOrCloseModal(false);
        navigator.goBack();
    }

    return (
        <View>
            <Modal animationType="fade" transparent={true} visible={params.visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.pendingLable}>Pending message</Text>
                        <View style={styles.messageContainer}>
                            <TextInput
                                multiline={true}
                                style={styles.messageInput}
                                onChangeText={(message) => { setMessage(message) }}

                            />
                        </View>
                        <View style={styles.buttenContainer}>
                            <View style={styles.btnContainer}>
                                <Butten onPress={addMessageAndUpdateFollowUp}>submit</Butten>
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
        alignItems: "flex-end",
    },
    btnContainer: {
        margin: 10,
    },
    pendingLable: {
        textAlign: "center",
        margin: 5,
        padding: 5,
        fontWeight: "500",
        fontSize: 18,
    },
    messageContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C5E1A5",
        padding: 4,
        width: 280,
        height: 140,
        backgroundColor: "#F1F8E9",
        elevation: 2,
    },
    messageInput: {
        textAlign: "left",
        textAlignVertical: "top",
        paddingHorizontal: 5,
        paddingVertical: 4,
    }
});

export default PendingStatusSubmit