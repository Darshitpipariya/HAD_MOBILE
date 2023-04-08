import { View, Text, StyleSheet, Alert, TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { resetPassword } from '../util/http';
import Butten from '../Component/Butten';
import { COLOR } from '../util/config';
import { MaterialIcons } from '@expo/vector-icons';
const SetNewPassword = (props) => {

    const navigation = props.navigation;
    const username = props.route.params.username;
    const secret = props.route.params.secret;
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [editable,setEditable]=useState(true);
    const [pass1Visible, setPass1Visible] = useState(false);
    const [pass2Visible, setPass2Visible] = useState(false);
    async function submitPassword() {
        if(password.trim()===''){
            alert("Enter Password");
        }else if(password!==repassword){
            alert("Password doesn't match!");
        }else{
            setEditable(false);
            try {
                const response=await resetPassword(username,password,secret);
                alert("Successfully reset password");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })    
            } catch (error) {
                alert("Unable to set Password");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })  
            }
        }
    }
    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.passwordContainer}>
                <TextInput
                    
                    style={styles.passwordInput}
                    onChangeText={(password) => { setPassword(password) }}
                    value={password}
                    placeholder='Enter New Password'
                    editable={editable}
                    secureTextEntry={!pass1Visible}
                />
                <TouchableOpacity onPress={() => { setPass1Visible(!pass1Visible) }} style={{ paddingHorizontal: 10, }}>
                    {pass1Visible ? <MaterialIcons name="visibility" size={24} color="black" />
                        : <MaterialIcons name="visibility-off" size={24} color="black" />}
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    onChangeText={(password) => { setRePassword(password) }}
                    value={repassword}
                    placeholder='Re Enter New Password'
                    editable={editable}
                    secureTextEntry={!pass2Visible}
                />
                <TouchableOpacity onPress={() => { setPass2Visible(!pass2Visible) }} style={{ paddingHorizontal: 10, }}>
                    {pass2Visible ? <MaterialIcons name="visibility" size={24} color="black" />
                        : <MaterialIcons name="visibility-off" size={24} color="black" />}
                </TouchableOpacity>
            </View>
            <View styles={styles.buttenContainer}>
                <Butten onPress={submitPassword} >  Enter </Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    mainContainer: {
        padding: "10%",
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLOR.defaultBackGroundColor,
        
    },
    passwordContainer: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.inputBorderColor,
        padding: 4,
        margin: 10,
        backgroundColor: COLOR.inputBackGroundColor,
        elevation: 2,
        width: "85%",
    },
    passwordInput: {
        flex:1,
        textAlign: "left",
        textAlignVertical: "center",
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    buttenContainer:{
        margin: 5, 
        padding: 5,
    }
})

export default SetNewPassword