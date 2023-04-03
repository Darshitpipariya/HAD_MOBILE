import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import FirstPin from './FirstPin';
import Logout from '../Component/Logout'
import Drawer from './Drawer';

const Stack = createStackNavigator();


const AppStack = () => {
    return (

        <Stack.Navigator initialRouteName='Enter Pin'>

            <Stack.Screen options={{ headerRight: () => (< Logout />), headerTitle: "" }} name="Enter Pin" component={FirstPin} />
            <Stack.Screen
                name="Root"
                options={{ headerShown: false }}
                component={Drawer}
            />
        </Stack.Navigator>
    )

}

export default AppStack