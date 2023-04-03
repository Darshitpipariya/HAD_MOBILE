import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const Fieldinput = (params) => {
    return (
        <View style={styles.fieldContainer}>
            <View style={params.lableContainer}>
                <Text style={params.textLable}>{params.fieldname}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={16}
                    onChangeText={(value) => {
                        params.setFieldValue(params.index, value)
                    }
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: "row",
        marginVertical: 5,
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#5C6BC0",
        padding: 5,
        minWidth: "40%",
        maxWidth: "80%",
        backgroundColor: "#E1F5FE",
        elevation: 2,
    },
    input: {
        paddingHorizontal: 5,
    }
})

export default Fieldinput