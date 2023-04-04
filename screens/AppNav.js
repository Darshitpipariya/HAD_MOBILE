import { View, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { COLOR } from '../util/config';


export default function AppNav() {
    const { isLoading, userTocken ,pin} = useContext(AuthContext)

    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,backgroundColor:COLOR.defaultBackGroundColor}}>
            <ActivityIndicator size={'large'} />
        </View>);
    }

    return (
        <NavigationContainer >
            {userTocken!==null && pin!==null?<AppStack/>:<AuthStack/>}
        </NavigationContainer>
    )
}

