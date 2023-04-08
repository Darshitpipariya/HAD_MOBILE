import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SQLite from 'expo-sqlite';
import { DATABASE } from '../util/config';
import { DbContext } from './DbContext';

export const FollowUpContext = new createContext();



const FollowUpProvider = ({ children }) => {
    const db = SQLite.openDatabase(DATABASE.name, '1.0', 'Demo', 1000000);
    const [backlogFollowUpList, setBacklogFollowUpList] = useState([]);
    const [todaysFollowUpList, setTodaysFollowUpList] = useState([]);
    const [getAllFollowUpList, setGetAllFollowUpList] = useState([]);
    const { tableName, syncList, setSyncList } = useContext(DbContext);
    
    useEffect(() => {
        console.log("Sync " + syncList);
        if (syncList == true) {
            getTodaysFollowUpsfromDatabase().catch((error) => {
                console.log("Today" + error);
            })
            getBackLogFollowUpsfromDatabase().catch((error) => {
                console.log("BAcklog" + error);
            })
            getAllFollowUpsFromDatabase().catch((error) => {
                console.log("All Error" + error);
            })
            setSyncList(false);
        }
    }, [syncList])

    async function getTodaysFollowUpsfromDatabase() {
        const today = new Date();
        const Todaydate = today.getFullYear() + "-" + (today.getMonth() > 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" + ((today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate());
        console.log("TodayDate from TodayFollowups " + Todaydate);
        db.transaction((tx) => {
            const Query = "SELECT * FROM " + tableName + " WHERE dateOfFollowUp = ? AND status= ? AND mystatus = ? ";
            const res = tx.executeSql(
                Query,
                [Todaydate, 0, 0],
                (tx, res) => {
                    console.log("Called Today " + JSON.stringify(res.rows._array))
                    let temp = []
                    res.rows._array.forEach((f) => {
                        temp.push(f);
                    })
                    setTimeout(() => {
                        setTodaysFollowUpList(temp);
                    }, 10);
                },
                (tx, err) => {
                    console.log(err);
                }
            )
        });
    }
    async function getBackLogFollowUpsfromDatabase() {
        const today = new Date();
        const Todaydate = today.getFullYear() + "-" + (today.getMonth() > 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" + ((today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate());
        console.log("Today Date from BacklogFollowUp " + Todaydate);
        db.transaction((tx) => {
            const Query = "SELECT * FROM " + tableName + " WHERE (status = ? AND dateOfFollowUp < ?) OR (mystatus =? AND dateOfFollowUp = ?)   ORDER BY dateOfFollowUp DESC";
            tx.executeSql(
                Query,
                [0, Todaydate, 2, Todaydate],
                (tx, res) => {
                    console.log("Called Backlog" + JSON.stringify(res.rows._array));
                    setBacklogFollowUpList(res.rows._array);
                },
                (tx, err) => {
                    console.log(err);
                }
            )
        });
    }

    async function getAllFollowUpsFromDatabase() {
        db.transaction((tx) => {
            const Query = "SELECT * FROM " + tableName + " WHERE status = ?  ORDER BY dateOfFollowUp DESC";
            tx.executeSql(
                Query,
                [0],
                (tx, res) => {
                    console.log("Called All" + JSON.stringify(res.rows._array));
                    setGetAllFollowUpList(res.rows._array);
                },
                (tx, err) => {
                    console.log(err);
                }
            )
        });
    }

    async function getAllFollowUpsFromDatabaseForDate(date) {
        return new Promise((resolve, reject) => {

            const Curdate = date.getFullYear() + "-" + (date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + ((date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate());
            console.log("Cur Date from getAllFollowUpsFromDatabaseForDate " + Curdate);
            db.transaction((tx) => {
                const Query = "SELECT * FROM " + tableName + " WHERE (status = ? AND dateOfFollowUp == ?) ORDER BY dateOfFollowUp DESC";
                tx.executeSql(
                    Query,
                    [0, Curdate],
                    (tx, res) => {
                        console.log("Called All Date at "+ Curdate +" " + JSON.stringify(res.rows._array));
                        resolve(res.rows._array);
                    },
                    (tx, err) => {
                        console.log(err);
                        reject(err);
                    }
                )
            });
        })
    }

    async function UpdateFollowUpInDatabase(f) {
        db.transaction((tx) => {
            const Query = `UPDATE ` + tableName + ` set
                    fuId = ?,
                    dateOfFollowUp = ? ,
                    actualDateOfFollowUp = ?,
                    actualTimeOfFollowUp = ? ,
                    status = ? ,
                    mystatus = ? ,
                    instruction = ? ,
                    bloodSugar = ? ,
                    bloodOxygen = ? ,
                    skinColor = ? ,
                    eyeColor = ? ,
                    temperature = ? ,
                    inflammation = ? ,
                    observation = ? ,
                    secretKey = ? ,
                    reasonIfDelayed = ? ,
                    uhId = ? ,
                    fname = ? ,
                    lname = ? ,
                    gender = ? ,
                    dob = ? ,
                    mobileNo = ? ,
                    street1 = ? ,
                    state = ? ,
                    city = ? ,
                    district = ? ,
                    pincode = ? ,
                    prescription = ? ,
                    hrId = ? WHERE fuId = ? `;
            tx.executeSql(
                Query,
                [
                    f.fuId,
                    f.dateOfFollowUp,
                    f.actualDateOfFollowUp,
                    f.actualTimeOfFollowUp,
                    f.status,
                    f.mystatus,
                    f.instruction,
                    f.bloodSugar,
                    f.bloodOxygen,
                    f.skinColor,
                    f.eyeColor,
                    f.temperature,
                    f.inflammation,
                    f.observation,
                    f.secretKey,
                    f.reasonIfDelayed,
                    f.uhId,
                    f.fname,
                    f.lname,
                    f.gender,
                    f.dob,
                    f.mobileNo,
                    f.street1,
                    f.state,
                    f.city,
                    f.district,
                    f.pincode,
                    f.prescription,
                    f.hrId,
                    f.fuId
                ],
                (tx, res) => {
                    console.log("Update in TABLE " + res.rows._array);
                    setSyncList(true);
                },
                (tx, err) => {
                    console.log(err);
                }
            )
        });
    }

    return (
        <FollowUpContext.Provider value={{ backlogFollowUpList, todaysFollowUpList, getAllFollowUpList, getAllFollowUpsFromDatabaseForDate, getAllFollowUpsFromDatabase, getTodaysFollowUpsfromDatabase, getBackLogFollowUpsfromDatabase, UpdateFollowUpInDatabase, getAllFollowUpsFromDatabaseForDate }}>
            {children}
        </FollowUpContext.Provider>
    )
}
export default FollowUpProvider;