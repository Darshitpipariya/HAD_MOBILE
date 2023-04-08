import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLOR } from '../util/config';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FollowUpContext } from '../context/FollowUpContext';
import FollowUpTable from '../Component/FollowUpTable';
import { useNavigation } from '@react-navigation/native'

const FutureFollowUps = ({ setCount }) => {
    const navigation = useNavigation();
    const todayDate = new Date();
    const [date, setDate] = useState(new Date());
    const [list, setList] = useState([]);
    const [selectDate, setSelectDate] = useState('Select Date');
    const { getAllFollowUpList, getAllFollowUpsFromDatabase, getAllFollowUpsFromDatabaseForDate } = useContext(FollowUpContext);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        getFollowUps(currentDate);
        setSelectDate('');
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
        });
    };

    const getFollowUps = async (currentDate) => {
        await getAllFollowUpsFromDatabaseForDate(currentDate)
            .then((followUpList) => {
                setList(followUpList)
            })
            .catch((err) => {
                console.log("get Folloup ERROR " + err)
            })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            getAllFollowUpsFromDatabase()
            setSelectDate('Select Date');
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        setList(getAllFollowUpList);

    }, [getAllFollowUpList])
    useEffect(()=>{
        setCount(list.length);
    },[list])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={showDatepicker} style={styles.dateInputContainer}>
                    <Text style={styles.dateString}>{selectDate !== 'Select Date' ? date.toDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
            </View>
            <FollowUpTable FollowUps={list} fillUpDisabled={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.defaultBackGroundColor,
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    dateInputContainer: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR.inputBorderColor,
        backgroundColor: COLOR.inputBackGroundColor,
    },
    dateString: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontSize: 13,
        fontWeight: "600",
    },
})

export default FutureFollowUps