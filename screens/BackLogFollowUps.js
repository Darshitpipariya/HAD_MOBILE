import { View, StyleSheet, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import FollowUpTable from '../Component/FollowUpTable'
import Butten from '../Component/Butten';
import { FollowUpContext } from '../context/FollowUpContext';
import { DbContext } from '../context/DbContext';
const BackLogFollowUps = (params) => {

    const { backlogFollowUpList } = useContext(FollowUpContext);

    const { Sync, lastSyncTime } = useContext(DbContext);
    useEffect(()=>{
        params.setCount(backlogFollowUpList.length)
    },[backlogFollowUpList])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.syncContainer}>
                <View>
                    <Text style={styles.syncTime}>Last Sync | {lastSyncTime}</Text>
                </View>
                <View>
                    <Butten continerStyle={styles.syncbuttenContainer} textstyle={styles.syncbuttenText} onPress={() => { Sync() }} > Sync </Butten>
                </View>
            </View>
            <View>
                <FollowUpTable FollowUps={backlogFollowUpList} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#E3F2FD"
    },
    syncContainer: {
        flexDirection:"row",
        alignSelf: "flex-end",
        justifyContent: "flex-start",
        marginHorizontal: 5,
        marginVertical: 5,
    },
    syncbuttenText: {
        fontSize: 15,
        fontWeight: "normal",
    },
    syncbuttenContainer: {
        backgroundColor: "#81D4FA"
    }
    , syncTime: {
        textAlignVertical: "center",
        padding: 10,
        fontWeight: "600"
    }
});
export default BackLogFollowUps;