import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { AntDesign, Fontisto  } from '@expo/vector-icons';
import { format } from 'date-fns'

import { Text, View } from '../components/Themed';
import { LawContentModel } from '../model/Law';
import { environment } from '../environment';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';
import { ColorStyle } from '../style/ColorStyle';

export default function LawDetail({ taskId }: { taskId: string }) {
  const [lawinfo, setLawinfo] = useState<LawContentModel>()
  const [systemList, setSystemList] = useState<Array<string>>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLawDetail = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Law/GetLawDetailByTaskId?taskId=${taskId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setLawinfo(res.data);
        setSystemList(res.data?.systemList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getLawDetail();
  }, []);

  const Systemelement = systemList.map((item, index) => {
    return(
      <View key={index} style={styles.SystemWrapper}>
        <Text style={[styles.TextContentBox1, { fontFamily: 'Poppins_400Regular', marginTop: 2, marginBottom: 5 }]}>
          {'\u2022' + ' '}{item}
        </Text>
      </View>
    )
  })

  const LawDetailWrapper = () => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow:1, backgroundColor: 'transparent' }}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        >
        {/* heading */}
        <View style={styles.CardContainer}>
          <Text style={[styles.TextHeader, {color: 'white', fontSize: 20, backgroundColor: '#13af82' }]}>{lawinfo?.actType}</Text>
          
          <View style={{ backgroundColor: '#13af82' }}>
            <View style={styles.CardLocationContainer}>
              <Fontisto name="map-marker-alt" size={18} color='white' style={{ marginRight: 8 }} />
              <Text style={[styles.TextHeader, { color: 'white' }]}>{lawinfo?.locationName}</Text>
            </View>
          </View>
        </View>

        {/* content */}
        <View style={styles.ContentContainer}> 
          <Text style={styles.TextHeader}>ชื่อกฎหมาย: </Text>
          <Text style={styles.TextContentBox1}> {lawinfo?.title} </Text>

          <View style={styles.DateWrapper}>
            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ประกาศ </Text>
              <Text style={styles.TextContentBox1}>
                {lawinfo?.announceDate ? format(new Date(lawinfo?.announceDate), 'dd/MM/yyyy') : '-' }
              </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่มีผลบังคับใช้ </Text>
              <Text style={styles.TextContentBox1}>
                {lawinfo?.enforceDate ? format(new Date(lawinfo?.enforceDate), 'dd/MM/yyyy') : '-' }
              </Text>
            </View>

            <View style={{backgroundColor:'#D1D1D1', width:1}}/>

            <View style={styles.DateItem}>
              <Text style={styles.TextHeader}>วันที่ยกเลิก </Text>
              <Text style={styles.TextContentBox1}>
                {lawinfo?.cancelDate ? format(new Date(lawinfo?.cancelDate), 'dd/MM/yyyy') : '-' }
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ContentContainer}>
          <Text style={styles.TextHeader}>หมวดประเภทกฎหมาย </Text>
          <Text style={styles.TextContentBox2}> {lawinfo?.catagory} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎหมาย </Text>
          <Text style={styles.TextContentBox2}> {lawinfo?.legislationUnit} </Text>

          <Text style={styles.TextHeader}>ประเภทพระราชบัญญัติ </Text>
          <Text style={styles.TextContentBox2}> {lawinfo?.actType} </Text>

          <Text style={styles.TextHeader}>ประเภทกฎกระทรวง,ระเบียบ,ประกาศ </Text>
          <Text style={styles.TextContentBox2}> {lawinfo?.legislationType} </Text>
        </View>

        <View style={styles.ContentContainer}>
          <Text style={styles.TextHeader}>ระบบที่เกี่ยวข้อง </Text>

          {systemList ? Systemelement : {}}

          <Text style={styles.TextHeader}>ไฟล์แนบ </Text>
          <TouchableOpacity style={{ backgroundColor: 'FFDBDB', padding: 5 }} onPress={() => Linking.openURL(lawinfo?.pdfUrl ?? '')}>
            <AntDesign name='pdffile1' size={50} color={'#FF4F4F'}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  return isLoading ? <LoadingElement/> : <LawDetailWrapper/>;
}

const LoadingElement = () => {
  return (
    <View style={[ViewStyle.LoadingWrapper, { height: '100%' }]}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    width: '100%',
    backgroundColor: '#13af82',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  CardLocationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start', 
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5
  },
  ContentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 5,
    borderRadius: 6,
    padding: 10,
    elevation: 5,
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextContentBox1: {
    marginTop:5,
    marginBottom: 10,
    fontFamily: 'Mitr_300Light',
    color: '#000',
  },
  TextContentBox2: {
    marginLeft:20, 
    marginTop:5,
    marginBottom: 10,
    fontFamily: 'Mitr_300Light',
    color: '#000',
  },
  DateWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DateItem: {
    marginHorizontal: 10,
    marginVertical: 2,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  SystemWrapper: {
    marginLeft: 20,
    backgroundColor: '#fff',
  }
});
