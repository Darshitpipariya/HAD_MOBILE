import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLOR } from '../util/config';

const ProfileFields = (params) => {
    return (

        <View style={styles.fieldContainer}>
            <View style={styles.fieldLableContainer}>
                <Text style={styles.fieldLableText}>{params.lable}</Text>
            </View>
            <View style={styles.fieldValueContainer}>
                <Text style={[styles.fieldValueText, params.fieldValueText!==null?params.fieldValueText:{} ]}>{params.value}</Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: "row",
        margin: 5,
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    fieldLableContainer: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        width: 110,
        borderColor: COLOR.lableBorderColor,
        backgroundColor: COLOR.lableBackgroundColor,
    },
    fieldLableText: {
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center",
        textAlignVertical: "center",
    },
    fieldValueContainer: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal:2,
        flex:1,
        borderRadius:10,
        backgroundColor: COLOR.lableValueBackgroundColor,
    },
    fieldValueText: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "left",
        textAlignVertical: "center",

    }

});
export default ProfileFields