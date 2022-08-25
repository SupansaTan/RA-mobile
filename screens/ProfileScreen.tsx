import React, { useEffect, useState } from "react";
import { StyleSheet, Appearance } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../assets/images/avatar.svg";
import Colors from "../constants/Colors";
import { Text, View, MaterialIcons } from "../components/Themed";
import { User, UserInfo } from "../constants/UserInfo";
import { environment } from "../environment";
import { ResponseModel } from "../model/Response.model";
import { EmployeeProfileModel } from "../model/Employee.model";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<EmployeeProfileModel>();

  useEffect(() => {
    const getUserInfo = () => {
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
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getUserInfo();
  }, []);

  const RoleElement = userProfile?.roleList.map((item, index) => {
    return (
      <View key={index}>
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

  return (
    <View style={styles.Container}>
      <View style={styles.UserWrapper}>
        <Avatar width={70} height={70} marginRight={20} />
        <View style={styles.UserTextWrapper}>
          <Text style={styles.TextHeader}>
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
          <View style={styles.EmailWrapper}>
            <Text style={[styles.EmailText, { color: "#000" }]}>
              {userProfile?.email}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.TextHeader}>ตำแหน่ง</Text>
      {RoleElement}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  RoleWrapper: {
    backgroundColor: "#fff",
    width: 370,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  LocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: 5,
  },
  UserWrapper: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  UserTextWrapper: {
    flexDirection: "column",
  },
  EmailWrapper: {
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
  },
  EmailText: {
    fontSize: 18,
    fontFamily: "Mitr_500Medium",
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: "#000",
  },
  TextHeader: {
    fontSize: 22,
    fontFamily: "Mitr_500Medium",
  },
  TextDatail: {
    fontSize: 18,
    color: "#13AF82",
    fontFamily: "Mitr_500Medium",
    marginHorizontal: 5,
  },
});
