import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FollowUpForm from './FollowUpForm';
import NormalFollowUps from './NormalFollowUps';
const Stack = createStackNavigator();

const NormalFormStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{unmountOnBlur: true }}>
            <Stack.Screen options={{ headerShown: false}} name="List"  component={NormalFollowUps} />
            <Stack.Screen
                name="FollowUpForm"
                options={{ headerShown: false }}
                component={FollowUpForm}
            />
        </Stack.Navigator>
    )
}

export default NormalFormStackNavigator