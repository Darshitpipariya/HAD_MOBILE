import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

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
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#f0ffff",
        backgroundColor: "#f0ffff",
        elevation: 1,
    },
    fieldLableContainer: {
        paddingHorizontal: 5,
        paddingVertical: 12,
        width: 110,
    },
    fieldLableText: {
        fontSize: 17,
        fontWeight: "500",
        textAlign: "left",
        textAlignVertical: "center",
    },
    fieldValueContainer: {
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    fieldValueText: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "left",
        textAlignVertical: "center",
    }

});
export default ProfileFields