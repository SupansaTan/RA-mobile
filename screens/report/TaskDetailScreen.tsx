import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons, Fontisto, Feather } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import ProgressCircle from 'react-native-progress-circle'

import { TaskDetail } from '../../constants/Report';

export function ReportTaskDetailScreen() {
  const [taskList, setTaskList] = useState(TaskDetail)
  const [showR, setShowR] = useState(false)
  const [showRA, setShowRA] = useState(false)
  const [showC, setShowC] = useState(false)
  const [showCA, setShowCA] = useState(false)
  const [showFL, setShowFL] = useState(false)

  const enableDetail = (type:string) => {
    switch(type){
      case 'relevantapprove':{
        setShowRA(!showRA)
        break;
      }
      case 'relevant':{
        setShowR(!showR)
        break;
      }
      case 'consistanceapprove':{
        setShowCA(!showCA)
        break;
      }
      case 'consistance':{
        setShowC(!showC)
        break;
      }
      case 'followup':{
        setShowFL(!showFL)
        break;
      }
    }
  }

  const selectShow = (type:string) => {
    switch(type){
      case 'relevantapprove':{
        return(showRA)
      }
      case 'relevant':{
        return(showR)
      }
      case 'consistanceapprove':{
        return(showCA)
      }
      case 'consistance':{
        return(showC)
      }
      case 'followup':{
        return(showFL)
      }
    }
  }

  const getTitle = (type:string) => {
    switch(type){
      case 'relevantapprove':{
        return('อนุมัติประเมินความเกี่ยวข้อง')
      }
      case 'relevant':{
        return('ประเมินความเกี่ยวข้อง')
      }
      case 'consistanceapprove':{
        return('อนุมัติประเมินความสอดคล้อง')
      }
      case 'consistance':{
        return('ประเมินความสอดคล้อง')
      }
      case 'followup':{
        return('ติดตามงาน')
      }
      case 'complete':{
        return('ปิดงาน')
      }
    }
  }

  const showDetail = (content:any) => {
    return(
      <View style={[styles.GreenCard]}>

        { content.accept? 
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent:'center', marginBottom:10 }}>
          <ProgressCircle
            percent={content.accept / (content.accept+content.reject) * 100}
            radius={40}
            borderWidth={8}
            color="#13AF82"
            shadowColor="#EEEEEE"
            bgColor="#fff"
          >
            <Text style={[styles.TextContent, {fontSize:24, color:"#13AF82"}]}>{Math.floor(content.accept / (content.accept+content.reject) * 100)}%</Text>
          </ProgressCircle> 

          <View style={{backgroundColor:'transparent', justifyContent:'center' }}>
            <View style={{flexDirection:'row', backgroundColor:'transparent', alignItems:'center', marginLeft:10}}>
              <Text style={styles.TextContent}>ผ่าน : </Text>
              <Text style={styles.TextDetail}>{Math.floor(content.accept / (content.accept+content.reject) * 100)}%</Text>
            </View>

            <View style={{flexDirection:'row', backgroundColor:'transparent', alignItems:'center', marginLeft:10}}>
              <Text style={styles.TextContent}>ไม่ผ่าน : </Text>
              <Text style={styles.TextDetail}>{Math.floor(content.reject / (content.accept+content.reject) * 100)}%</Text>
            </View>
          </View>
        </View>
        : <></>}

        <View style={{flexDirection:'row', backgroundColor:'transparent', alignItems:'center', marginLeft:10}}>
          <Text style={styles.TextContent}>ประเมินโดย : </Text>
          <Text style={styles.TextDetail}>{content.person}</Text>
        </View>

        <View style={{flexDirection:'row', backgroundColor:'transparent', alignItems:'center', marginLeft:10}}>
          <Text style={styles.TextContent}>วันที่ประเมิน : </Text>
          <Text style={styles.TextDetail}>{content.datetime}</Text>
        </View>
        
      </View>
    )
  }

  const ShowDropdownIcon = (type:string) => {
    return(
      type==='complete'? <></>: 
      selectShow(type)==true? <Feather name='chevron-up' size={20} color={'#13AF82'}/> : <Feather name='chevron-down' size={20} color={'#13AF82'} />
    )
  }

  const ProgressElement = taskList.progress.map((content,index) => {
    return(
      <View key={index} style={{margin:10, width:'100%'}}>
        <Pressable onPress={()=> enableDetail(content.type)}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={[styles.TextHeader, {color:'#13AF82'}]}>{getTitle(content.type)}</Text>
            {ShowDropdownIcon(content.type)}
          </View>
        </Pressable>
        {selectShow(content.type)==true? showDetail(content) : <></>}
        
      </View>
      
    )
  })

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.GreenCard}>
          <Text style={styles.TextHeader}>{taskList.title} </Text>
          <View style={styles.ContentWrapper}>
            <MaterialCommunityIcons name='clipboard-text-outline' size={30} style={{marginLeft:20}}/>
            <Text style={[styles.TextDetail,{marginHorizontal:10, marginRight:30}]} >{'\t'}{taskList.lawdetail} </Text>
          </View>
          <View style={styles.ContentWrapper}>
            <Fontisto name="map-marker-alt" size={30} color={'#13AF82'} style={{marginRight:10}}/>
            <Text style={[styles.TextContent,{color:'#13AF82'}]}>{taskList.location} </Text>
          </View>
        </View>

        <View style={styles.ProgressWrapper}>
          {ProgressElement}
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom:50,
    marginTop:10,
  },
  ContentWrapper:{
    flexDirection:'row',
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProgressWrapper:{
    flexDirection:'column',
    backgroundColor:'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop:10,
  },
  GreenCard: {
    backgroundColor: '#DEF4EC',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    width:'80%'
  },
  TextHeader: {
    fontSize: 20,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextContent: {
    fontSize: 16,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextDetail: {
    color:'#000'
  },

});
