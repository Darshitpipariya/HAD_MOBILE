import { View, StyleSheet,ScrollView} from 'react-native'
import React from 'react'
import FlllowUpRow from '../Component/FollowUpRow';
const FollowUpTable = ({ FollowUps, fillUpDisabled }) => {
    
    

    return (
        <View style={styles.tableContainer}>
        <ScrollView>
            {FollowUps.map((followUp) => {
                    return <View key={followUp.fuId}><FlllowUpRow followUp={followUp} fillUpDisabled={fillUpDisabled}/></View>;
            })}
        </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    tableContainer: {
        alignItems: "flex-start",
        alignSelf: "center",
        justifyContent: "flex-start",
        marginHorizontal: 4,
        marginVertical: 4,
    }
});

export default FollowUpTable