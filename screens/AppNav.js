import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


export default function AppNav() {
    const { isLoading, userTocken ,pin} = useContext(AuthContext)

    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={'large'} />
        </View>);
    }

    return (
        <NavigationContainer >
            {userTocken!==null && pin!==null?<AppStack/>:<AuthStack/>}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center"
    },
});