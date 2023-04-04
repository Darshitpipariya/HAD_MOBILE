import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Butten from './Butten';
import { useNavigation } from '@react-navigation/native'
import { Month } from '../util/month';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dialCall } from '../util/openDailer';
import { Feather } from '@expo/vector-icons';
import { COLOR } from '../util/config';
const FollowUpRow = ({ followUp }) => {

  const navigator = useNavigation();
  let objectdate = new Date(followUp.dateOfFollowUp);
  let date = objectdate.getDate();
  let month = Month(objectdate.getMonth() + 1);
  let year = objectdate.getFullYear();
  const fullname = followUp.fname + " " + followUp.lname;
  const address = followUp.street1 + "\n" + followUp.city + ", " + followUp.district;

  return (

    <View style={styles.followUpContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date + "-" + month + "-" + year}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{fullname}</Text>
          <Text style={styles.contactText}>{followUp.mobileNo}</Text>
          <Text style={styles.addressText}  >{address}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Butten
            textstyle={styles.fillUpBtn}

            onPress={() => {
              navigator.navigate("FollowUpForm",
                {
                  followUp: followUp,
                })
            }}>Fill Up</Butten>
          <Butten onPress={() => { dialCall(followUp.mobileNo) }}>
            <Feather name="phone-call" size={15} color="white" />
          </Butten>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  followUpContainer: {
    marginVertical: 5,
    marginHorizontal: 9,
    padding:2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:12,
    elevation:8,
    backgroundColor: COLOR.cardBackGroubdColor,
  },
  fillUpBtn: {
    fontSize: 15,
    fontWeight: "500"
  },
  dateContainer: {
    width: "24%",
  },
  dateText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    padding: 3,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 14,
    fontWeight: "700"
  },
  infoContainer: {
    padding: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "50%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  nameText: {
    padding: 5,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "700"
  },
  contactText: {
    padding: 5,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500",
  },
  addressText: {
    padding: 5,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500"
  },
  btnContainer: {
    width: "26%",
    marginRight: 6,
    marginLeft: 2,
  }
})

export default FollowUpRow