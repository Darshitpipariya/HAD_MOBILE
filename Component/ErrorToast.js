import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ErrorToast = (params) => {
    return (
        params.visible && <View style={[styles.toast,params.toastContainer]}>
            <Text style={[styles.toastMsg, , params.toastTextStyle]}>{params.msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    toast: {
        paddingBottom:"15%", 
    },
    toastMsg: {
        alignSelf:"center",
        minWidth: "50%",
        maxWidth: "100%",
        elevation: 8,
        borderColor: "rgb(255, 0, 0)",
        borderWidth: 1,
        borderRadius: 50,
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(255, 55, 0)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:15,
    }
})
export default ErrorToast