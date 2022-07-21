import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Appearance } from 'react-native';
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
        <Text style={styles.TextContentBox1}>{'\u2022' + ' '}{item}</Text>
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <Text style={[styles.TextHeader, {color: Appearance.getColorScheme()==='dark'? '#fff':'#000'}]}>{lawinfo.ActType} </Text>

      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.ContentContainer}> 
          <Text style={styles.TextHeader}>ชื่อกฎหมาย: </Text>
          <Text style={styles.TextContentBox1}> {lawinfo.Title} </Text>

          <View style={styles.DateWrapper}>
            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ประกาศ </Text>
              <Text style={styles.TextContentBox1}> {lawinfo.AnnounceDate} </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่มีผลบังคับใช้ </Text>
              <Text style={styles.TextContentBox1}> {lawinfo.EnforceDate} </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ยกเลิก </Text>
              <Text style={styles.TextContentBox1}> {lawinfo.CancelDate} </Text>
            </View>
          </View>
          
        </View>

        <View style={styles.ContentContainer}>
          <Text style={styles.TextHeader}>หมวดประเภทกฎหมาย </Text>
          <Text style={styles.TextContentBox2}> {lawinfo.Category} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎหมาย </Text>
          <Text style={styles.TextContentBox2}> {lawinfo.LegislationUnit} </Text>

          <Text style={styles.TextHeader}>ประเภทพระราชบัญญัติ </Text>
          <Text style={styles.TextContentBox2}> {lawinfo.ActType} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎกระทรวง,ระเบียบ,ประกาศ </Text>
          <Text style={styles.TextContentBox2}> {lawinfo.LegislationType} </Text>
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
    paddingLeft: 5,
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
    color: '#000',
  },
  TextContentBox1: {
    marginTop:5,
    marginBottom: 10,
    color: '#000',
  },
  TextContentBox2: {
    marginLeft:20, 
    marginTop:5,
    marginBottom: 10,
    color: '#000',
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
