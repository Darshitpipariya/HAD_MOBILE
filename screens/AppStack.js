import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import FirstPin from './FirstPin';
import Logout from '../Component/Logout'
import Drawer from './Drawer';
import { COLOR } from '../util/config';
import { View } from 'react-native';

const Stack = createStackNavigator();


const AppStack = () => {
    return (

        <Stack.Navigator initialRouteName='Enter Pin' screenOptions={{headerStyle:{backgroundColor:COLOR.defaultHeaderBackGroundColor}}}>
            <Stack.Screen options={{ headerRight: () => (<View style={{paddingHorizontal:5,elevation:2,}}>< Logout /></View>), headerTitle: "" }} name="Enter Pin" component={FirstPin} />
            <Stack.Screen
                name="Root"
                options={{ headerShown: false }}
                component={Drawer}
            />
        </Stack.Navigator>
    )

}

export default AppStack