import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './Profile';
import HomeScreen from './HomeScreen';
import DrawerWithLogoutButton from '../Component/DrawerWithLogoutButton';
import { COLOR } from '../util/config';

const MyDrawer = createDrawerNavigator();
const Drawer = () => {
    return (

        <MyDrawer.Navigator
            screenOptions={{
                drawerLabelStyle: { fontSize: 16 },
                headerStyle: {  backgroundColor:COLOR.defaultHeaderBackGroundColor},
                unmountOnBlur: true
            }}
            drawerContent={(props) => <DrawerWithLogoutButton {...props} />}>
            <MyDrawer.Screen name="Home" title="home" component={HomeScreen} />
            <MyDrawer.Screen name="Profile" title="profile" component={Profile} />
        </MyDrawer.Navigator>
    )
}

export default Drawer