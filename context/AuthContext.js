import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';
import { loginhttp } from '../util/http';
import { deleteDatabaseTable, SyncFollowUp } from '../util/database';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [userTocken, setUserTocken] = useState(null);
    const [userinfo, setUserInfo] = useState(null);
    const [pin, setPin] = useState(null);
    const [userLoginId, setUserLoginId] = useState(null);
    const [isOffline, setIsOffline] = useState();
    async function login(username, password) {
        console.log("username " + username);
        console.log("password " + password);

        setIsLoading(true);
        try {
            const response = await loginhttp(username, password);
            await SecureStore.setItemAsync('userLoginId', response.data[0].loginId);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(response.data[0].citizen));
            await SecureStore.setItemAsync("userTocken", response.headers.token);
            setUserLoginId(response.data[0].loginId);
            setUserInfo(response.data[0].citizen);
            setUserTocken(response.headers.token);
        }
        catch (error) {
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);

    }

    async function storePin(pinvalue) {
        setIsLoading(true);
        setPin(pinvalue);
        await SecureStore.setItemAsync('pin', pinvalue);
        setIsLoading(false);
    }

    async function clearCredential(){
        setIsLoading(true);
        await SecureStore.deleteItemAsync('userLoginId');
        await SecureStore.deleteItemAsync('userTocken');
        await SecureStore.deleteItemAsync('userInfo');
        await SecureStore.deleteItemAsync('pin');
        setUserLoginId(null);
        setUserTocken(null);
        setPin(null);
        setUserInfo(null);
        setIsLoading(false);
    }

    async function logout() {
        setIsLoading(true);
        const userId = userinfo.uhId;
        const tableName = "USER" + userId + "Table";
        console.log("while LOGOUT START 1")
        await SyncFollowUp(userTocken, tableName)
            .then(async () => {
                await deleteDatabaseTable(tableName).then(
                    async ()=>{
                        console.log(" while LOGOUT START 2")
                        await SecureStore.deleteItemAsync('userLoginId');
                        await SecureStore.deleteItemAsync('userTocken');
                        await SecureStore.deleteItemAsync('userInfo');
                        await SecureStore.deleteItemAsync('pin');
                        setUserLoginId(null);
                        setUserTocken(null);
                        setPin(null);
                        setUserInfo(null);
                    }
                ).catch((error)=>{
                    console.log("LOGOUT START 3 "+error)
                    setIsLoading(false);
                })
            })
            .catch((err) => {
                console.log("ERROR while LOGOUT START 4",err);
                setIsLoading(false);
            });
        
        
        console.log("log out");
        setIsLoading(false);
    }

    async function isLoggedIn() {
        try {
            setIsLoading(true);
            let suserTocken = await SecureStore.getItemAsync('userTocken');
            let suserLoginId = await SecureStore.getItemAsync('userLoginId');
            let suserInfo = await SecureStore.getItemAsync('userInfo');
            let spin = await SecureStore.getItemAsync('pin');
            let sJuserInfo = JSON.parse(suserInfo);
            if (suserLoginId !== null && suserTocken !== null && sJuserInfo !== null && spin !== null) {
                setUserLoginId(suserLoginId);
                setUserTocken(suserTocken);
                setUserInfo(sJuserInfo);
                setPin(spin);
            } else if (suserLoginId === null || sJuserInfo === null || suserTocken === null || spin === null) {
                clearCredential();
            }
            setIsLoading(false);
        } catch (error) {
            console.error('is LoggedIn ' + error);
        }
    }




    // while loading app first check if user has already logged in or not if logged in set the user tocken stat and userinfo state 
    useEffect(() => {
        const unsubscribeNetworkStatus = NetInfo.addEventListener(
            (state) => {
                const offline = !(state.isConnected && state.isInternetReachable);
                console.log(offline);
                setIsOffline(offline);
            }
        )
        isLoggedIn();
        return () => unsubscribeNetworkStatus();
    }, [])
    return (
        <AuthContext.Provider value={{ login, logout, storePin, setIsLoading, clearCredential,isLoading, userTocken, userinfo, userLoginId, pin, isOffline }}>
            {children}
        </AuthContext.Provider>
    )
}