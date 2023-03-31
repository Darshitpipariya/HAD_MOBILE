import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PinSetup from './PinSetup';
import Login from './LoginStack';
import ForgotPassword from './ForgotPassword';
const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SetUp Pin" component={PinSetup} />
            <Stack.Screen name='Forgot Password' component={ForgotPassword}/>
        </Stack.Navigator>
    )
}

export default AuthStack