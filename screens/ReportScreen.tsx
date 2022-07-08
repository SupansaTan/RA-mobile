import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';

import { RootTabScreenProps } from '../types';
import { LocationList } from '../constants/Location';
import { ReportDetail } from '../constants/Report';
import { useNavigation } from '@react-navigation/native';

import { ColorStyle } from '../style/ColorStyle';

export function ReportScreen() {
    const [locationList, setLocation] = useState(LocationList)
    const navigation =  useNavigation()
  
    const LocationElement = locationList.map((LocationContentModel, index) => {
      return(
        <View key={index} >
          <TouchableOpacity onPress={() => navigation.navigate('ReportLocation')}>
            <View style={styles.ContentContainer}>
              {/* icon */}
              <View style={styles.IconWrapper}>
                <Fontisto name="map-marker-alt" size={30} color={ ColorStyle.Grey.color } style={{ marginHorizontal: 10 }} />
              </View>
  
              {/* title & content */}
              <View style={styles.ContentWrapper}>
                <Text style={styles.TextHeader}>{ LocationContentModel.location }</Text>
                <Text style={[styles.TextContent, ColorStyle.Grey]}>{ LocationContentModel.business }</Text>
              </View>
  
              {/* icon */}
              <View style={styles.MoreWrapper}>
                <MaterialIcons name="keyboard-arrow-right" size={30} />
              </View>
            </View> 
          </TouchableOpacity>
        </View>
      )
    })
  
  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { LocationElement }
      </ScrollView>
    </View>
  );
}

export function ReportLocationScreen() {
  const [content, setContent] = useState(ReportDetail)

  const ProgressElement = (content.StatusTask).map((item, index) => {
    return(
      <View key={index} style={{backgroundColor:'#fff'}}>
        <Text style={styles.TextHeader}>{item.status} ({item.total}) </Text>
        <Pressable style={styles.MoreTask}>
          <Text>งานทั้งหมด</Text>
          <MaterialIcons name="keyboard-arrow-right" size={30} />
        </Pressable>
      </View>
    )
  })

  return (
  <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.ContentContainer}>
          <View style={styles.ContentWrapper}>

            {/* icon */}
            <View style={styles.IconWrapper}>
              <Fontisto name="map-marker-alt" size={30} color={ ColorStyle.Grey.color } style={{ marginHorizontal: 10 }} />
              <Text style={styles.TextHeader}>{ content.location }</Text>
            </View>

            {/* dashboard */}
            <View style={styles.DashboardWrapper}>
              <Text>Dashboard</Text>
            </View>

            {/* progress */}
            <Text style={styles.TextHeader}>สถานะงานทั้งหมด</Text>
            <View style={styles.TaskStatusWrapper}>
              {ProgressElement}
            </View>
          </View>
          

        </View>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ContentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 5,
    borderRadius: 10,
    paddingRight:10,
  },
  ContentWrapper: {
    flex:1,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  IconWrapper: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    marginTop: 5,
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  },
  MoreWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
    backgroundColor: 'transparent'
  },
  DashboardWrapper:{ 
    backgroundColor:'#fff',
    padding: 10,
    marginVertical:10,

  },
  TaskStatusWrapper:{
    flex:1,
    backgroundColor:'#fff',
    padding: 10,
    borderRadius:10,
  },
  MoreTask:{
    backgroundColor:'#DEF4EC',
    marginVertical:5,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'40%',
    borderRadius:20,
  }
});
