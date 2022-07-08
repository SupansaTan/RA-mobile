import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons} from '@expo/vector-icons';

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { UserInfo } from '../constants/UserInfo';
import { MenuList } from '../constants/Menu';

import TrackingIcon from '../assets/images/tracking.svg';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [userinfo, setUserinfo] = useState(UserInfo)

  const getMenuIcon = (name: string) => {
    switch(name) {
      case 'Task':
        return  <Ionicons name='clipboard-outline' style={styles.IconWrapper} size={50} color={'#13AF82'}/>
      case 'Report':
        return  <Ionicons name='book-outline' style={styles.IconWrapper} size={50} color={'#13AF82'}/>
      case 'Tracking':
        return <TrackingIcon style={{  marginVertical: -20 }} width={60} height={90} />
    }
  }

  const MenuListElement = MenuList.map((item, index) => {
    return (
      <View style={{flexBasis: '50%'}} key={index}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(item.name)}>
          <View style={styles.MenuWrapper}>
            { getMenuIcon(item.name) }
            <Text style={styles.MenuText}>{ item.title }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.ContentContainer}>
          <Text style={[styles.TextHeader, {marginVertical:10}]}> สวัสดี {userinfo.Fname}</Text>

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Task')}>
            <View style={styles.MenuWrapper}>
              { getMenuIcon('Task') }
              <Text style={styles.MenuText}> งานทั้งหมด</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.MenuContainer} >
            { MenuListElement }
          </View>
         

        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ContentContainer: {
    marginVertical: 5,
    borderRadius: 10
  },
  IconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight:10,
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#6C6C6C',
  },
  MenuContainer: {
    flexDirection: 'row',
  },
  MenuWrapper: {
    margin: 5,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor:'#C1C1C1',
  },
  MenuText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  }

});
