import { AuthContext } from './AuthContext';
import { createContext, useContext, useEffect, useState } from 'react';
import { createDatabaseTable, SyncFollowUp } from '../util/database';
import { ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Month } from '../util/month';

export const DbContext = createContext();

const DbContextProvider = ({ children }) => {

    const { userinfo, userTocken, isOffline } = useContext(AuthContext);
    const [syncList, setSyncList] = useState(true);
    const [lastSyncTime, setLastSyncTime] = useState('');


    const userId = userinfo.uhId;
    const tableName = "USER" + userId + "Table";

    async function Sync() {
        if (!isOffline) {
            await SyncFollowUp(userTocken, tableName)
                .then(async () => {
                    const Fulldate = new Date();
                    const date = Fulldate.getDate();
                    const month = Month(Fulldate.getMonth() + 1);
                    const year = Fulldate.getFullYear();
                    await SecureStore.setItemAsync('lastSync', JSON.stringify(date + "-" + month + "-" + year + "  " + Fulldate.toLocaleTimeString()));
                    let lastSync = await SecureStore.getItemAsync('lastSync');
                    setTimeout(() => {
                        const val = lastSync.slice(1, lastSync.length - 1);
                        setLastSyncTime(val);
                        console.log("LAST SYNC TIME : " + val);
                    }, 100)
                    ToastAndroid.show('Synced',ToastAndroid.BOTTOM);
                })
                .catch((error) => { console.log(error) });
        } else {
            let lastSync = await SecureStore.getItemAsync('lastSync');
            setTimeout(() => {
                const val = lastSync.slice(1, lastSync.length - 1);
                setLastSyncTime(val);
                console.log("LAST SYNC TIME : " + val);
            }, 100)
            console.log("LAST SYNC TIME : " + lastSync);
            ToastAndroid.show("Internet is not avalible", ToastAndroid.SHORT);
        }
        setTimeout(() => {
            setSyncList(true);
        }, 100);
    }



    useEffect(() => {
        createDatabaseTable(tableName);
        Sync()
    }, [])


    return (
        <DbContext.Provider value={{ tableName, Sync, syncList, setSyncList, lastSyncTime }}>
            {children}
        </DbContext.Provider>
    );
}

export default DbContextProvider