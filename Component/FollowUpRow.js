import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Butten from './Butten';
import { useNavigation } from '@react-navigation/native'

const FollowUpRow = ({ followUp }) => {

  const navigator = useNavigation();
  let objectdate = new Date(followUp.dateOfFollowUp);
  let date = objectdate.getDate();
  let month = objectdate.getMonth()+1;
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
      </View>
    </View>);
}


const styles = StyleSheet.create({
  followUpContainer: {
    borderColor: "hsl(120, 100%, 98%)",
    marginVertical: 5,
    marginHorizontal:5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FBE7",
    borderRadius:15,
    elevation: 3,
  },
  fillUpBtn: {
    fontSize: 15,
    fontWeight: "500"
  },
  dateContainer: {
    width: "20%",
    margin: 4,
  },
  dateText: {
    padding: 1,
    fontSize: 14,
    fontWeight: "700"
  },
  infoContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "50%",
  },
  nameText: {
    marginVertical:2,
    padding: 2,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "700"

  },
  contactText: {
    padding: 2,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500"

  },
  addressText: {
    padding: 2,
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500"

  },
  btnContainer: {
    margin: 2,
    padding: 2,
    width: "30%",
  }
})

export default FollowUpRow