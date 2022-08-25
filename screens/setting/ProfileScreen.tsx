import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../assets/images/avatar.svg";
import { Text, View } from "../../components/Themed";
import { User } from "../../constants/UserInfo";
import { environment } from "../../environment";
import { EmployeeProfileModel } from "../../model/Employee.model";
import { ViewStyle } from "../../style/ViewStyle";
import Colors from "../../constants/Colors";
import { TextStyle } from "../../style/TextStyle";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<EmployeeProfileModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserInfo = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Employee/GetEmployeeProfile?empId=${User.emdId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setUserProfile(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getUserInfo();
  }, []);

  const RoleElement = userProfile?.roleList.map((item, index) => {
    return (
      <View key={index} style={[{marginLeft:20, marginVertical:5, width:350}]}>
        <View style={styles.RoleWrapper}>
          <Text style={[styles.TextHeader, { color: "#000" }]}>
            {item.roleName}
          </Text>
          <View style={styles.LocationWrapper}>
            <Feather name="map-pin" size={22} color="#13AF82" />
            <Text style={styles.TextDatail}>{item.location}</Text>
          </View>
        </View>
      </View>
    );
  });

  const ProfileContainer = () => {
    return (
      <View style={styles.Container}>
        <View style={styles.UserWrapper}>
          <Avatar width={70} height={70} marginRight={20} />
          <View style={styles.UserTextWrapper}>
            <Text style={styles.TextHeader}>
              { userProfile ? `${userProfile?.firstName} ${userProfile?.lastName}` : '' }
            </Text>
            <View style={styles.EmailWrapper}>
              <Text style={[styles.EmailText, { color: "#000" }]}>
                { userProfile ? userProfile?.email : '' }
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.TextHeader, { paddingLeft: 10, marginLeft:20 }]}>ตำแหน่ง</Text>
        <View style={ViewStyle.ColumnContainer}>
          { userProfile ? RoleElement : <></>}
        </View>
      </View>
    );
  }

  return isLoading ? <LoadingElement/> : <ProfileContainer/>
}

const LoadingElement = () => {
  return (
    <View style={ViewStyle.LoadingWrapper}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  RoleWrapper:{
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  LocationWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 5,
  },
  UserWrapper:{
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft:10
  },
  UserTextWrapper:{
    flexDirection: 'column',
  },
  EmailWrapper: {
    borderRadius: 50,
    backgroundColor: '#EEEEEE',
  },
  EmailText: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: '#000'
  },
  TextHeader:{
    fontSize: 22,
    fontFamily: 'Mitr_500Medium',
  },
  TextDatail:{
    fontSize: 18,
    color: '#13AF82',
    fontFamily: 'Mitr_500Medium',
    marginHorizontal: 5,
  }
})