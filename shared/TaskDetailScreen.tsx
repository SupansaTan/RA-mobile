import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Appearance, Linking, ActivityIndicator } from 'react-native';
import { AntDesign, Feather, Fontisto, MaterialCommunityIcons  } from '@expo/vector-icons';
import { format } from 'date-fns'

import { Text, View } from '../components/Themed';
import { environment } from '../environment';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';
import { ColorStyle } from '../style/ColorStyle';

export default function TaskDetailScreen({ taskId }: { taskId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const TaskDetailWrapper = () => {
    return (
      <View style={styles.Container}>
        <View style={styles.ContentContainer}>
          <View style={styles.GreenCard}>
            <Text style={styles.TextHeader}>พ.ร.บพลังงานนิวเคลียร์</Text>

            <View style={styles.GreenCardItem}>
              <MaterialCommunityIcons name='text-box-search-outline' size={25}/>
              <View style={{flexDirection:'column', backgroundColor: 'transparent', marginLeft:5, width:'100%'}}>
                <Text style={styles.TextContent}>
                  กฎกระทรวงกำหนดมาตรฐานในการบริหาร จัดการและดำเนินการด้านความปลอดภัยอาชีวอนามัยและสภาพแวดล้อมในการทำงานเกี่ยวกับไฟฟ้า พ.ศ. ๒๕๕๘
                </Text>

                <View style={{flexDirection:'row', backgroundColor: 'transparent',}}>
                  <View style={styles.WhiteCard}>
                    <Text>ทั้งหมด x ข้อ</Text>
                  </View>
                  <TouchableOpacity style={styles.WhiteCard}>
                    <Text>ดูรายละเอียด</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>

            <View style={styles.GreenCardItem}>
                <Feather name="map-pin" size={25} color={'#0c916b'} style={{marginRight:5}}/>
                <Text style={styles.TextContent}>
                  ฟาร์มเลี้ยงสุกรนครนายก
                </Text>
            </View>

            <View style={styles.GreenCardItem}>
                <MaterialCommunityIcons name="calendar-blank" size={25} color={'#0c916b'} style={{marginRight:5}}/>
                <Text style={styles.TextContent}>
                  วันนี้ 13.00 น.
                </Text>
            </View>

          </View>
        </View>

        <View style={styles.StatusContainer}>
          <MaterialCommunityIcons name="circle-slice-5" size={25} color={ColorStyle.Warning.color} style={{marginRight:5}}/>
          <Text style={[styles.TextContent, {color:ColorStyle.Warning.color}]}> สถานะ: รออนุมัติความเกี่ยวข้อง </Text>
        </View>
        

      </View>
    )
  }

  return isLoading ? <LoadingElement/> : <TaskDetailWrapper/>;
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ContentContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: 6,
    padding: 10,
  },
  StatusContainer:{
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginLeft:10
  },
  TextHeader: {
    fontSize: 24,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
    textAlign: 'center',
  },
  TextContent: {
    fontSize: 17,
    fontFamily: 'Mitr_500Medium',
    color: '#383838',
  },
  GreenCard: {
    backgroundColor: ColorStyle.LightGreen.color,
    flexDirection: 'column',
    padding:10,
    width: '100%',
  },
  GreenCardItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical:5,
    width: '100%',
    paddingRight:20,
  },
  WhiteCard: {
    backgroundColor: '#fff',
    padding:5,
    borderRadius:20,
    paddingHorizontal:10,
    marginRight:10,
    marginVertical:5
  },
});
