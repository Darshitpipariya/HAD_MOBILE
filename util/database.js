import * as SQLite from 'expo-sqlite';
import { DATABASE } from './config';
import { syncFollowUps } from './http';
export const db = SQLite.openDatabase(DATABASE.name, '1.0', 'Demo', 1000000);

export async function createDatabaseTable(tableName) {
    db.transaction(tx => {
        let txQuery = tx.executeSql(
            "SELECT name FROM sqlite_master Where type='table' AND name=?",
            [tableName],
            (tx, res) => {
                console.log(res.rows._array);
                console.log(res.rows.length);
                if (res.rows.length === 0) {
                    tx.executeSql('DROP TABLE IF EXISTS ' + tableName,
                        [],
                        (tx, res) => {
                            console.log("Table droped" + res.rows);
                        },
                        (tx, err) => {
                            console.log(err);
                        }
                    );
                    const createQuery = `CREATE TABLE IF NOT EXISTS ` + tableName + `
                        (
                            fuId INTEGER PRIMARY KEY,
                            dateOfFollowUp VARCHAR(20) ,
                            actualDateOfFollowUp VARCHAR(20),
                            actualTimeOfFollowUp VARCHAR(20),
                            status INT(1),
                            mystatus INT(1) DEFAULT 0,
                            instruction TEXT,
                            bloodSugar TEXT,
                            bloodOxygen TEXT,
                            skinColor TEXT,
                            eyeColor TEXT,
                            temperature TEXT,
                            inflammation TEXT,
                            observation TEXT,
                            secretKey TEXT,
                            reasonIfDelayed TEXT,
                            uhId INTEGER NOT NULL,
                            fname TEXT,
                            lname TEXT,
                            gender TEXT,
                            dob TEXT,
                            mobileNo VARCHAR(10),
                            street1 TEXT,
                            state TEXT,
                            city TEXT,
                            district TEXT,
                            pincode TEXT,
                            prescription TEXT,
                            hrId INT
                            )
                        `
                    tx.executeSql(
                        createQuery,
                        [],
                        (tx, res) => {
                            console.log(createQuery + "\n");
                            console.log(res.rows._array + "\n");
                        },
                        (tx, err) => {
                            console.log(err);
                        }
                    )
                }
            },
            (tx, err) => {
                console.log(err)
            },
        );
    });
}

export async function deleteDatabaseTable(tableName) {

    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS ' + tableName,
            [],
            (tx, res) => {
                console.log("DROP TABLE RES" + res.rows._array);
            },
            (tx, err) => {
                console.log("DROP TABLE ERROR " + err);
                throw err;
            }
        );
    })
}

export async function getUpdatedFollowups(tableName) {
    return new Promise((resolve, reject) => {
        let p = [];
        db.transaction((tx) => {
            const Query = `SELECT 
                    fuId ,
                    dateOfFollowUp ,
                    actualDateOfFollowUp ,
                    actualTimeOfFollowUp ,
                    status ,
                    instruction ,
                    bloodSugar,
                    bloodOxygen,
                    skinColor,
                    eyeColor,
                    temperature,
                    inflammation,
                    observation ,
                    secretKey ,
                    reasonIfDelayed ,
                    uhId ,
                    fname ,
                    lname ,
                    gender ,
                    dob ,
                    mobileNo ,
                    street1 ,
                    state ,
                    city ,
                    district ,
                    pincode ,
                    prescription,
                    hrId FROM ` + tableName + ` WHERE mystatus = ? OR mystatus = ? `;
            tx.executeSql(
                Query,
                [1, 2],
                (tx, res) => {
                    p = [];
                    res.rows._array.forEach((f) => {
                        p.push({
                            "fuId": f.fuId,
                            "dateOfFollowUp": f.dateOfFollowUp,
                            "actualDateOfFollowUp": f.actualDateOfFollowUp,
                            "actualTimeOfFollowUp": f.actualTimeOfFollowUp,
                            "status": f.status,
                            "instruction": f.instruction,
                            "bloodSugar":f.bloodSugar,
                            "bloodOxygen":f.bloodOxygen,
                            "skinColor":f.skinColor,
                            "eyeColor":f.eyeColor,
                            "temperature":f.temperature,
                            "inflammation":f.inflammation,
                            "observation": f.observation,
                            "secretKey": f.secretKey,
                            "reasonIfDelayed": f.reasonIfDelayed,
                            "uhId": f.uhId,
                            "fname": f.fname,
                            "lname": f.lname,
                            "gender": f.gender,
                            "dob": f.dob,
                            "mobileNo": f.mobileNo,
                            "street1": f.street1,
                            "state": f.state,
                            "city": f.city,
                            "district": f.district,
                            "pincode": f.pincode,
                            "prescription": f.prescription,
                            "healthRecord": {
                                "hrId": f.hrId
                            }
                        })
                    })
                    console.log("p " + JSON.stringify(p));
                },
                (tx, err) => {
                    console.log("GET FOLLOWUPS FOR UPLOAD TO SERVER ERROR" + err);
                    reject("error");
                }
            )
        });
        setTimeout(() => {
            resolve(p);
        }, 300)

    })

}

export async function insertFollowUpIntoDatabases(tableName, f) {
    const mystatus = f.reasonIfDelayed === null ? 0 : 2;
    const reasonIfDelayed = f.reasonIfDelayed === null ? '' : f.reasonIfDelayed;
    db.transaction((tx) => {
        const Query = `INSERT INTO ` + tableName + ` 
                (
                    fuId ,
                    dateOfFollowUp ,
                    actualDateOfFollowUp ,
                    actualTimeOfFollowUp ,
                    status ,
                    instruction ,
                    bloodSugar,
                    bloodOxygen,
                    skinColor,
                    eyeColor,
                    temperature,
                    inflammation,
                    observation ,
                    secretKey ,
                    reasonIfDelayed ,
                    uhId ,
                    fname ,
                    lname ,
                    gender ,
                    dob ,
                    mobileNo ,
                    street1 ,
                    state ,
                    city ,
                    district ,
                    pincode ,
                    prescription,
                    hrId,
                    mystatus
                ) 
            VALUES 
                (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;
        tx.executeSql(
            Query,
            [
                f.fuId,
                f.dateOfFollowUp,
                f.actualDateOfFollowUp,
                f.actualTimeOfFollowUp,
                f.status,
                f.instruction,
                f.bloodSugar,
                f.bloodOxygen,
                f.skinColor,
                f.eyeColor,
                f.temperature,
                f.inflammation,
                f.observation,
                f.secretKey,
                reasonIfDelayed,
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
                f.healthRecord.hrId,
                mystatus,
            ],
            (tx, res) => {
                console.log("Inserted in TABLE");
                console.log(JSON.stringify(res.rowsAffected));
            },
            (tx, err) => {
                console.log("INSERT ROW ERROR" + err);
            }
        )
    });
}

export async function deleteFollowUpsfromDatabases(tableName, fuId) {
    db.transaction((tx) => {
        const Query = "DELETE FROM " + tableName + " WHERE fuId = ?";
        tx.executeSql(
            Query,
            [fuId],
            (tx, res) => {
                console.log("ROW deleted " + fuId)
                console.log(res.rows._array);
            },
            (tx, err) => {
                console.log(err);
            }
        )
    });
}

export async function insertNewFollowups(tableName, followUps) {
    console.log("Inside Multiple Follow up insert");
    followUps.forEach(async (f) => {
        await insertFollowUpIntoDatabases(tableName, f);
    })
}

export async function deleteSubmitedFollowups(tableName, followUps) {
    followUps.forEach(async (f) => {
        if (f.status === 1) {
            await deleteFollowUpsfromDatabases(tableName, f.fuId);
        }
    })
}

export async function SyncFollowUp(userTocken, tableName) {

    let followUpList = await getUpdatedFollowups(tableName).catch((error) => { console.log(error) });
    console.log("upload following followUps " + JSON.stringify(followUpList));

    await syncFollowUps(followUpList, userTocken)
        .then(async (InsertFollowUpList) => {
            if (InsertFollowUpList?.data) {
                await insertNewFollowups(tableName, InsertFollowUpList.data[0].followUps).catch((error) => {
                    console.log(JSON.stringify(error));
                });
            }
            if (followUpList !== null && followUpList !== undefined) {
                await deleteSubmitedFollowups(tableName, followUpList);
            }
        })
        .catch((err) => {
            console.log(err)
            throw err
        });




    return followUpList;
}

