import React, { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import Avatar from '../assets/images/avatar.svg';
import Colors from '../constants/Colors';
import { Text, View, MaterialIcons } from '../components/Themed';

export default function SettingScreen() {
  const [username, setUsername] = useState<string>('ฟ้า ทลายโจร')
  const [enabledNotify, setEnabledNotify] = useState<boolean>(true)
  const [darkmode, setDarkmode] = useState<boolean>(false)

  return (
    <View style={styles.Container}>
      {/* user profile */}
      <View style={styles.UserInfoWrapper}>
        <Avatar style={styles.Avatar} width={80} height={80} />
        <Text style={styles.Username}>{ username }</Text>
        <View style={styles.SeeProfileWrapper}>
          <Text style={styles.SeeProfileText} lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary}>ดูโปรไฟล์</Text>
          <MaterialIcons style={styles.RightArrow} name="keyboard-arrow-right" size={24} />
        </View>
      </View>

      {/* setting */}
      <View style={styles.SettingWrapper}>
        <Text style={styles.SettingTitle}>ทั่วไป</Text>
        
        {/* notify */}
        <View style={styles.ItemWrapper}>
          <View style={styles.ItemTitleWrapper}>
            <Fontisto name="bell" size={24} color="black" style={styles.ItemIcon} />
            <Text style={styles.ItemText}>การแจ้งเตือน</Text>
          </View>
          <Switch
            trackColor={{ false: "#eeeeee", true: "#28bc8e" }}
            thumbColor="#fff"
            ios_backgroundColor="#eeeeee"
            onValueChange={() => setEnabledNotify(!enabledNotify)}
            value={enabledNotify}
          />
        </View>

        {/* darkmode */}
        <View style={styles.ItemWrapper}>
          <View style={styles.ItemTitleWrapper}>
            <Fontisto name="night-clear" size={24} color="black" style={styles.ItemIcon} />
            <Text style={styles.ItemText}>โหมดกลางคืน</Text>
          </View>
          <Switch
            trackColor={{ false: "#eeeeee", true: "#28bc8e" }}
            thumbColor="#fff"
            ios_backgroundColor="#eeeeee"
            onValueChange={() => setDarkmode(!darkmode)}
            value={darkmode}
          />
        </View>

        {/* log out */}
        <View style={styles.ItemWrapper}>
          <View style={styles.ItemTitleWrapper}>
            <FontAwesome name="sign-out" size={24} color="black" style={styles.ItemIcon} />
            <Text style={styles.ItemText}>ออกจากระบบ</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  UserInfoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Avatar: {
    margin: 10
  },
  Username: {
    fontSize: 23,
    fontFamily: 'Mitr_500Medium'
  },
  SeeProfileWrapper: {
    margin: 5,
    paddingVertical: 2,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    flexDirection: 'row'
  },
  SeeProfileText: {
    fontSize: 16,
    fontFamily: 'Mitr_400Regular'
  },
  RightArrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  SettingWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 15,
    marginHorizontal: 5
  },
  SettingTitle: {
    color: '#6c6c6c',
    fontFamily: 'Mitr_400Regular'
  },
  ItemWrapper: {
    width: '100%',
    paddingRight: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ItemTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ItemText: {
    fontSize: 16,
    fontFamily: 'Mitr_400Regular'
  },
  ItemIcon: {
    marginRight: 10
  }
});
