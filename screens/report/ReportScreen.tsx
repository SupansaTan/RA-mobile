import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Pressable, LogBox } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

import { RootTabScreenProps } from '../../types';
import { LocationList } from '../../constants/Location';
import { ReportDetail } from '../../constants/Report';
import { useNavigation } from '@react-navigation/native';

import { ColorStyle } from '../../style/ColorStyle';
import ProgressCircle from 'react-native-progress-circle'
import Timeline from 'react-native-timeline-flatlist';

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
  const navigation =  useNavigation()

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const ProgressElement = (content.StatusTask).map((item, index) => {
    return(
      {time: index+1, 
        title: <Text style={styles.TextHeader}>{item.status} ({item.total}) </Text> ,
        description:  <Pressable style={styles.MoreTask} onPress={() => navigation.navigate('ReportTaskProgress')}>
                        <Text>งานทั้งหมด</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={30} />
                      </Pressable>
      }
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
              <View style={styles.DashboardContent}>
                <ProgressCircle
                  percent={content.inprogressTask / content.totalTask * 100}
                  radius={50}
                  borderWidth={8}
                  color="#13AF82"
                  shadowColor="#EEEEEE"
                  bgColor="#fff"
                >
                  <Text style={[styles.TextContent, {fontSize:24, color:"#13AF82"}]}>{Math.floor(content.inprogressTask / content.totalTask * 100)}%</Text>
                </ProgressCircle>
                <View style={[styles.DashboardText, {justifyContent:'space-around'}]}>
                  <Text style={styles.TextContent}>ทั้งหมด {content.totalTask}</Text>
                  <Text style={styles.TextContent}>อยู่ในขั้นตอนการประเมิน {content.inprogressTask}</Text>
                  <Text style={styles.TextContent}>ประเมินสำเร็จ {content.completeTask}</Text>
                </View>
              </View>
              
              {/* เกี่ยวข้อง | ไม่เกี่ยวข้อง | สอดคล้อง | ไม่สอดคล้อง */}
              {/* <View style={styles.DashboardContent}>
                <View style={[styles.DashboardText, {alignItems:'center'}]}>
                  <Text style={styles.TextContent}>เกี่ยวข้อง</Text>
                  <Text>{content.reletedLaw}</Text>
                </View>

                <View style={{backgroundColor:'#D1D1D1', width:1}}/>

                <View style={[styles.DashboardText, {alignItems:'center'}]}>
                  <Text style={styles.TextContent}>ไม่เกี่ยวข้อง</Text>
                  <Text>{content.NonreletedLaw}</Text>
                </View>

                <View style={{backgroundColor:'#D1D1D1', width:1}}/>
                
                <View style={[styles.DashboardText, {alignItems:'center'}]}>
                  <Text style={styles.TextContent}>สอดคล้อง</Text>
                  <Text>{content.consistLaw}</Text>
                </View>

                <View style={{backgroundColor:'#D1D1D1', width:1}}/>

                <View style={[styles.DashboardText, {alignItems:'center'}]}>
                  <Text style={styles.TextContent}>ไม่สอดคล้อง</Text>
                  <Text>{content.NonconsistLaw}</Text>
                </View>
              </View> */}
              
              
              
            </View>

            {/* progress */}
            <View>
              <Text style={styles.TextHeader}>สถานะงานทั้งหมด</Text>
              <View style={styles.TaskStatusWrapper}>
                <Timeline
                  showTime={false}
                  lineColor={"#13AF82"}
                  lineWidth={5}
                  innerCircle={'dot'}
                  circleColor={"#13AF82"}
                  circleSize={20}
                  data={ProgressElement}
                />
              </View>
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
    borderRadius:10,
    elevation:3,
  },
  DashboardContent:{ 
    flexDirection:'row',
    backgroundColor:'#fff',
    justifyContent:'space-around',
    margin:5,
  },
  DashboardText:{
    margin:5,
    backgroundColor:'#fff',
    justifyContent:'center'
  },
  TaskStatusWrapper:{
    flex:1,
    backgroundColor:'#fff',
    padding: 10,
    borderRadius:10,
    elevation:3,
  },
  MoreTask:{
    backgroundColor:'#DEF4EC',
    marginVertical:5,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'40%',
    borderRadius:20,
  },
});
