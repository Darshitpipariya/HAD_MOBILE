import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FollowUpForm from './FollowUpForm';
import BackLogFollowUps from './BackLogFollowUps';

const Stack = createStackNavigator();
const NormalFormStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ unmountOnBlur: true }}>
            <Stack.Screen options={{ headerShown: false }} name="List" component={BackLogFollowUps} />
            <Stack.Screen
                name="FollowUpForm"
                options={{ headerShown: false }}
                component={FollowUpForm}
            />
        </Stack.Navigator>
    )
}

export default NormalFormStackNavigator