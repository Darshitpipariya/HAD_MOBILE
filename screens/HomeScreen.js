import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NormalFormStackNavigator from './NormalFormStackNavigator';
import BackLogFormStackNavigator from './BackLogFormStackNavigator'
import FollowUpProvider from '../context/FollowUpContext';
import DbContextProvider from '../context/DbContext';
const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <DbContextProvider>
            <FollowUpProvider>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: "500" },
                        unmountOnBlur: true
                    }}>
                    <Tab.Screen
                        name='Today'
                        component={NormalFormStackNavigator}
                    />
                    <Tab.Screen
                        name='Backlog'
                        component={BackLogFormStackNavigator}

                    />

                </Tab.Navigator>
            </FollowUpProvider>
        </DbContextProvider>
    )
}

export default HomeScreen