import { View ,StyleSheet} from 'react-native';
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Logout from './Logout';
const DrawerWithLogoutButton = (props) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{flex:1,justifyContent:"space-between"}}>
            <View >
            <DrawerItemList {...props} />
            </View>
            <View style={styles.logoutContainer} >
            <Logout/>
            </View>
        </DrawerContentScrollView>
    )
}
const styles=StyleSheet.create({
    logoutContainer:{
        margin:10,
    }
});
export default DrawerWithLogoutButton