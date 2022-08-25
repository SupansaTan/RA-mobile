import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, TextInput, Keyboard, InputAccessoryView, Button } from 'react-native';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import Avatar from '../../assets/images/avatar.svg';
import Colors from '../../constants/Colors';
import { Text, View, MaterialIcons } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { DarkTheme } from '@react-navigation/native';
import { environment } from '../../environment';
import { User } from '../../constants/UserInfo';

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  const [username, setUsername] = useState<string>('ฟ้า ทลายโจร')
  const [enabledNotify, setEnabledNotify] = useState<boolean>(true)
  const [darkmode, setDarkmode] = useState<boolean>(false)
  const [number, onChangeNumber] = useState<string>('7')
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserInfo = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Employee/GetEmployee?empId=${User.emdId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setUsername(`${res.data.firstName} ${res.data.lastName}`);
        setDarkmode(res.data.darkTheme);
        setEnabledNotify(res.data.notificationStatus);
        onChangeNumber(`${res.data.advanceNotify}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getUserInfo();
  }, []);

  return (
    <View style={styles.Container}>
      {/* user profile */}
      <View style={styles.UserInfoWrapper}>
        <Avatar style={styles.Avatar} width={80} height={80} />
        <Text style={styles.Username}>{ username }</Text>
        <View style={styles.SeeProfileWrapper}>
          <Text style={styles.SeeProfileText} lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary} 
            onPress={() => navigation.navigate('Profile')}>
            ดูโปรไฟล์
          </Text>
          <MaterialIcons style={styles.RightArrow} name="keyboard-arrow-right" size={24} color='black' />
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
        
        {enabledNotify? 
          <View style={styles.AdvanceDateWrapper} >
            <Text style={[styles.ItemText, {color: '#000'}]}>วันแจ้งเตือนล่วงหน้า</Text>
              <View style={styles.InputWrapper}>
                <TextInput
                style={styles.InputText}
                onChangeText={onChangeNumber}
                value={number}
                keyboardType="numeric"
                inputAccessoryViewID='Close'
                />
                { Platform.OS == 'ios' ?
                  <InputAccessoryView nativeID='Close'>
                    <View style={styles.KeyboardBT}>
                      <Button onPress={()=> Keyboard.dismiss()} title="Close"></Button>
                    </View>
                  </InputAccessoryView>
                  : <></>
                }
                </View>
          </View>
        : <></>
        }
        
        {/* darkmode */}
        <View style={styles.ItemWrapper}>
          <View style={styles.ItemTitleWrapper}>
            <Fontisto name="night-clear" size={24} color="black" style={styles.ItemIcon} />
            <Text style={styles.ItemText}>โหมดกลางคืน </Text>
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
        <TouchableOpacity onPress={()=> navigation.navigate('SignIn')}>
          <View style={styles.ItemWrapper}>
            <View style={[styles.ItemTitleWrapper, { paddingTop: Platform.OS === 'ios' ? 5:10 }]}>
              <FontAwesome name="sign-out" size={24} color="black" style={styles.ItemIcon} />
              <Text style={styles.ItemText}>ออกจากระบบ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  AdvanceDateWrapper: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
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
    paddingLeft: 15,
    paddingRight: 5,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    flexDirection: 'row'
  },
  SeeProfileText: {
    fontSize: 16,
    fontFamily: 'Mitr_400Regular',
    color: '#000'
  },
  RightArrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  SettingWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 15,
    marginHorizontal: 10,
  },
  SettingTitle: {
    color: '#6c6c6c',
    fontFamily: 'Mitr_400Regular'
  },
  ItemWrapper: {
    width: '100%',
    paddingRight: 20,
    paddingTop: Platform.OS === 'ios' ? 12:0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ItemText: {
    fontSize: 16,
    fontFamily: 'Mitr_400Regular',
  },
  ItemIcon: {
    marginRight: 10,
    color: DarkTheme.dark === true ? 'black':'white'
  },
  InputWrapper: {
    marginLeft: Platform.OS == 'ios'? '48%':'45%' ,
    width: 50,
    borderRadius: 10,
  },
  InputText: {
    textAlign: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Mitr_400Regular',
  },
  KeyboardBT: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8
  },
});
