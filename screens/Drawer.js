import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './Profile';
import HomeScreen from './HomeScreen';
import DrawerWithLogoutButton from '../Component/DrawerWithLogoutButton';

const MyDrawer = createDrawerNavigator();
const Drawer = () => {
    return (
            <MyDrawer.Navigator
                screenOptions={{
                    drawerLabelStyle: { fontSize: 16 },
                    unmountOnBlur: true
                }}
                drawerContent={(props) => <DrawerWithLogoutButton {...props} />}>
                <MyDrawer.Screen name="Home" component={HomeScreen} />
                <MyDrawer.Screen name="Profile" component={Profile} />
            </MyDrawer.Navigator>
    )
}

export default Drawer