import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import ProfileFields from '../Component/ProfileFields';
import { Month } from '../util/month';
const Profile = () => {

  const { userinfo } = useContext(AuthContext);
  const citizen = userinfo;
  console.log(JSON.stringify(citizen));
  const name = citizen.fname + " " + citizen.lname;
  const gender = citizen.gender == 'F' ? 'Female' : 'Male'
  const dobFull = new Date(citizen.dob);
  const dob = dobFull.getDate() + "-" + Month(dobFull.getMonth()+1) + "-" + dobFull.getFullYear();
  const address = citizen.street1 + "\n" + citizen.city + ", " + citizen.district +", " + citizen.pincode + ", " + citizen.state;
  const fieldValueList = [
    {
      lable: "Name",
      value: name
    },
    {
      lable: "Gender",
      value: gender
    },
    {
      lable: "Date Of Birth",
      value: dob
    },
    {
      lable: "Address",
      value: address
    },
  ]
  return (
    <View style={styles.mainContainer}>
        {fieldValueList.map(({lable,value})=>{
          console.log(lable);
          let fieldValueText=null
          if(lable=='Address'){
            fieldValueText={
              maxWidth:"90%"
            }
          }
          return <ProfileFields key={lable} lable={lable} value={value} fieldValueText={fieldValueText}/>
        })}
      
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical:"15%",
    backgroundColor:"#E3F2FD"
  },

});

export default Profile