import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign  } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { LawContentModel } from '../model/Law';
import { SystemType, LawInfo } from '../constants/LawDetail';

export default function LawDetail({ path }: { path: string }) {
  const [lawinfo, setLawinfo] = useState<LawContentModel>(LawInfo)
  const [systemList, setSystemList] = useState(SystemType)

  const Systemelement = systemList.map((item, index) => {
    return(
      <View key={index} style={styles.SystemWrapper}>
        <Text>{'\u2022' + ' '}{item}</Text>
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <Text style={styles.TextHeader}>{lawinfo.ActType} </Text>

      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.ContentContainer}> 
          <Text style={styles.TextHeader}>ชื่อกฎหมาย: </Text>
          <Text style={{marginVertical:10}}> {lawinfo.Title} </Text>

          <View style={styles.DateWrapper}>
            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ประกาศ </Text>
              <Text> {lawinfo.AnnounceDate} </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่มีผลบังคับใช้ </Text>
              <Text> {lawinfo.EnforceDate} </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ยกเลิก </Text>
              <Text> {lawinfo.CancelDate} </Text>
            </View>
          </View>
          
        </View>

        <View style={styles.ContentContainer}>
          <Text style={styles.TextHeader}>หมวดประเภทกฎหมาย </Text>
          <Text style={styles.TextContent}> {lawinfo.Category} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎหมาย </Text>
          <Text style={styles.TextContent}> {lawinfo.LegislationUnit} </Text>

          <Text style={styles.TextHeader}>ประเภทพระราชบัญญัติ </Text>
          <Text style={styles.TextContent}> {lawinfo.ActType} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎกระทรวง,ระเบียบ,ประกาศ </Text>
          <Text style={styles.TextContent}> {lawinfo.LegislationType} </Text>
        </View>

        <View style={styles.ContentContainer}>
          <Text style={styles.TextHeader}>ระบบที่เกี่ยวข้อง </Text>

          {Systemelement}

          <Text style={styles.TextHeader}>ไฟล์แนบ </Text>
          <TouchableOpacity>
            <AntDesign name='pdffile1' size={50} style={{margin:10}} color={'#FF4F4F'}/>
          </TouchableOpacity>
          
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ContentContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    elevation: 5,

  },
  TextHeader: {
    fontSize: 16,
    fontFamily: 'Mitr_500Medium',
  },
  TextContent: {
    marginLeft:20, 
    marginTop:5,
    marginBottom: 10,
  },
  DateWrapper: {
    backgroundColor: '#fff',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DateItem: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  SystemWrapper: {
    marginLeft: 20,
    marginVertical: 5,
    backgroundColor: '#fff',
  }
  
});
