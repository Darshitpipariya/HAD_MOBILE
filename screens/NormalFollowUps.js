import { View, StyleSheet, Text } from 'react-native'
import React, { useContext ,useEffect} from 'react'
import Butten from '../Component/Butten';
import FollowUpTable from '../Component/FollowUpTable';
import { FollowUpContext } from '../context/FollowUpContext';
import { DbContext } from '../context/DbContext';
import { COLOR } from '../util/config';


const NormalFollowUps = (params) => {

    const { todaysFollowUpList } = useContext(FollowUpContext);
    const { Sync, lastSyncTime } = useContext(DbContext);
    useEffect(() => {
        params.setCount(todaysFollowUpList.length)
    }, [todaysFollowUpList])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.syncContainer}>
                <View style={styles.syncTimeContainer}>
                    <Text style={styles.syncTime}>Last Sync | {lastSyncTime}</Text>
                </View>
                <View>
                    <Butten  textstyle={styles.syncbuttenText} onPress={() => { Sync() }} > Sync </Butten>
                </View>
            </View>
            <View>
                <FollowUpTable FollowUps={todaysFollowUpList} fillUpDisabled={false} />
            </View>
        </View >
    )

}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:COLOR.defaultBackGroundColor
    },

    syncContainer: {
        flexDirection: 'row',
        alignSelf: "flex-end",
        justifyContent: "flex-start",
        marginHorizontal: 5,
        paddingHorizontal:5,
        marginVertical: 5,

    },
    syncTimeContainer:{
        alignSelf: "center"
    },
    syncbuttenText: {
        fontSize: 15,
        fontWeight: "normal",
    },
    syncTime:{
        textAlignVertical:"center",
        padding:10,
        fontWeight:"600"
    }

});

export default NormalFollowUps