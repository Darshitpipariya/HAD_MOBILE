import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NormalFormStackNavigator from './NormalFormStackNavigator';
import BackLogFormStackNavigator from './BackLogFormStackNavigator'
import FollowUpProvider from '../context/FollowUpContext';
import DbContextProvider from '../context/DbContext';
import { COLOR } from '../util/config';
import FutureFollowUps from './FutureFollowUps';
const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {

    const [countToday,setCountToday]=useState(0);
    const [countBackLog, setCountBackLog] = useState(0);
    const [countAll, setCountAll] = useState(0);
    return (
        <DbContextProvider>
            <FollowUpProvider>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: "500" },
                        tabBarStyle: { backgroundColor: COLOR.tabBarHeaderColor },
                        tabBarActiveTintColor:"#ffffff",
                        tabBarInactiveTintColor:"#b59ae6",
                        tabBarIndicatorStyle: { backgroundColor:"#ffffff",},
                        unmountOnBlur: true,
                    }}>
                    <Tab.Screen
                        name='Today'
                        options={{ tabBarLabel: `Today (${countToday})` }}
                        children={() => <NormalFormStackNavigator setCount={setCountToday} />}
                    />
                    <Tab.Screen
                        name='Backlog'
                        options={{tabBarLabel:`Backlog (${countBackLog})`}}
                        
                        children={() => <BackLogFormStackNavigator setCount={setCountBackLog}/>}
                    />
                    <Tab.Screen
                        name='All'
                        options={{ tabBarLabel: `All (${countAll})` }}
                        children={ () => <FutureFollowUps setCount={setCountAll} />}
                    />
                </Tab.Navigator>
            </FollowUpProvider>
        </DbContextProvider>
    )
}

export default HomeScreen