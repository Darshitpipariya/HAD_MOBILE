import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Butten = (params) => {

    return (
        <View>
            <TouchableOpacity style={[styles.Btn,params.continerStyle]} onPress={params.onPress}>
                <Text style={[styles.text, params.textstyle]}>{params.children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Btn: {
        width: 100,
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: "#81D4FA",
        elevation:60,
    },
    text:{
        fontSize:18,
        fontWeight:"500",
        textAlign:"center",
    }
});
export default Butten