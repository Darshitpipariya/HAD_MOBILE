import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { resetPassword } from '../util/http';
import Butten from '../Component/Butten';

const SetNewPassword = (props) => {

    const navigation = props.navigation;
    const username = props.route.params.username;
    const secret = props.route.params.secret;
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [editable,setEditable]=useState(true);
    
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
        <View styls={styles.mainContainer}>
            <View style={styles.passwordContainer}>
                <TextInput
                    
                    style={styles.passwordInput}
                    onChangeText={(password) => { setPassword(password) }}
                    value={password}
                    placeholder='Enter New Password'
                    editable={editable}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    onChangeText={(password) => { setRePassword(password) }}
                    value={repassword}
                    placeholder='Re Enter New Password'
                    editable={editable}
                />
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
        justifyContent: "center",
        alignItems:"center",
        
    },
    passwordContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C5E1A5",
        padding: 4,
        margin: 10,
        backgroundColor: "#F1F8E9",
        elevation: 2,
    },
    passwordInput: {
        textAlign: "left",
        textAlignVertical: "center",
        paddingHorizontal: 5,
        paddingVertical: 4,
    },
    buttenContainer:{
        margin: 5, 
        padding: 5,
    }
})

export default SetNewPassword