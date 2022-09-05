import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../types';
import { User } from '../constants/UserInfo';
import { KeyActAssessmentDetail, RelevantAssessmentModel } from '../model/Logging.model';
import { environment } from '../environment';
import { KeyActionAssessmentModel, TaskAssessmentModel, TaskDataModel } from '../model/Task.model';
import { TextStyle } from '../style/TextStyle';
import { ColorStyle } from '../style/ColorStyle';
import { KeyActModel } from '../model/KeyAct.model';


export default function TaskResultScreen({ taskId, keyactList }: { taskId: string, keyactList: Array<KeyActModel>}) {
    const [AssessmentList, setAssessmentList] = useState<Array<KeyActionAssessmentModel>>([]); 
    const [ taskData, setTaskData ] = useState<TaskDataModel>();

    useEffect(() => {
      const getTaskData = () => {
        fetch(`${environment.apiRaUrl}/api/Task/GetTaskDataById?taskId=${taskId}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((res) => {
          setTaskData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      };
      getTaskData();
    }, []);

    const ContentElement = keyactList.map((content,index) => {
      return(
        <View key={index} style={{ width: '100%' }}>
          {
            index > 0 ?
            <View style={{borderWidth: 0.8, borderColor:'#EEEEEE', marginVertical: 10 }}/> : <></>
          }
          <View style={[styles.RowView, {justifyContent:'space-between', flexGrow: 1 }]}>
            <Text style={[styles.TextContent, {color:getTextcolor(content.isRelated ?? false), width: '80%'}]} numberOfLines={1}>
              ข้อ {content.order} {content.keyReq}
            </Text>
            <Text style={styles.TextContent}>{content.isRelated===true? 'เกี่ยวข้อง':'ไม่เกี่ยวข้อง'}</Text>
          </View>
          {
            content.notation ? <Text style={[TextStyle.Content, {marginTop:5}]}>{'\t'}หมายเหตุ : {content.notation}</Text> : <></>
          }
        </View>
      )
    })
    
    return (
      <View style={styles.Container}>
        <View style={styles.GreenCard}>
          <Text style={[TextStyle.Heading, {alignItems:'center'}]}>{taskData?.taskTitle}</Text>
          <View style={[styles.RowView, { marginTop: 5 }]}>
            <Feather name="map-pin" size={25} color="#13AF82" style={{marginRight:5}}/>
            <Text style={[TextStyle.Content, { color:'#13AF82', fontSize: 18 }]}>{taskData?.locationName}</Text>
          </View>
        </View>

        <View style={styles.ContentContainer}>
          <View style={[styles.RowView, {justifyContent:'space-between'}]}>
            <Text style={[TextStyle.Content]}>ประเมินโดย</Text>
            <Text style={[TextStyle.Content]}>{User.Fname} {User.Lname}</Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', width: '100%' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: ColorStyle.LightGreen.color, borderRadius: 8, 
              flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2, marginRight: 5, alignItems: 'center' }}>
              <AntDesign name="check" size={16} color={ColorStyle.Green.color} style={{ marginRight: 5 }}/>
              <Text style={[TextStyle.Content, ColorStyle.Green]}>{ '3' }</Text>
            </View>
            <View style={{ backgroundColor: ColorStyle.LightRed.color, borderRadius: 8, 
              flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2, marginRight: 5, alignItems: 'center' }}>
              <Feather name="x" size={16} color={ColorStyle.Danger.color} style={{ marginRight: 5 }}/>
              <Text style={[TextStyle.Content, ColorStyle.Danger]}>{ '0' }</Text>
            </View>
            <View style={{ backgroundColor: ColorStyle.LightGrey.color, borderRadius: 8, 
              flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2, alignItems: 'center' }}>
              <AntDesign name="minuscircleo" size={16} color={ColorStyle.Grey.color} style={{ marginRight: 5 }} />
              <Text style={[TextStyle.Content, ColorStyle.Grey]}>{ '0' }</Text>
            </View>
          </View>
          
          <View style={{ backgroundColor: ColorStyle.LightGrey.color, 
            paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8 }}>
            <Text style={[TextStyle.Content]}>
              ทั้งหมด {3} ข้อ
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
          <ScrollView contentContainerStyle={{ flexGrow:1, width: '100%' }}>
            {ContentElement}
          </ScrollView>
        </View>
      </View>
    );
}


const getTextcolor = (Assessment:boolean) => {
  return(
    Assessment===true? '#13AF82': '#FF4F4F'
  )
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    marginHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ContentContainer: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    width: '100%',
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  },
  button: {
    backgroundColor:'#13AF82',
    width:'100%',
    height:'9%',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
  },
  GreenCard: {
    backgroundColor: '#DEF4EC',
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    width: '100%',
    marginVertical:5,
    borderRadius:10,
  },
  RowView : {
    flexDirection:'row', 
    backgroundColor:'transparent',
  },
});