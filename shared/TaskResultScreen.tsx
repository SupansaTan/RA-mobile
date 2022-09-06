import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { User } from '../constants/UserInfo';
import { environment } from '../environment';
import { TaskDataModel } from '../model/Task.model';
import { TextStyle } from '../style/TextStyle';
import { ColorStyle } from '../style/ColorStyle';
import { KeyActModel } from '../model/KeyAct.model';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TaskProcess } from '../enum/TaskProcess.enum';
import { format } from 'date-fns';


export default function TaskResultScreen({ taskId, keyactList, taskProcess }: { taskId: string, keyactList: Array<KeyActModel>, taskProcess: number}) {
    const [ taskData, setTaskData ] = useState<TaskDataModel>();
    const [ totalChecked, setTotalChecked ] = useState<number>(0);
    const [ totalUncheck, setTotalUncheck ] = useState<number>(0);
    const [ totalNotDo, setTotalNotDo ] = useState<number>(0);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
      const getTaskData = () => {
        setIsLoading(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
      };
      getTaskData();

      const checked = keyactList.filter(x => x.isChecked === true).length;
      const uncheck = keyactList.filter(x => x.isChecked === false && x.isChecked != undefined).length;
      const notDo = keyactList.filter(x => x.isChecked === undefined).length;
      setTotalChecked(checked);
      setTotalUncheck(uncheck);
      setTotalNotDo(notDo);
    }, []);

    const getLabel = (isChecked: boolean) => {
      switch(taskProcess) {
        case TaskProcess.Relevant:
          return isChecked ? 'เกี่ยวข้อง' : 'ไม่เกี่ยวข้อง';
        case TaskProcess.Consistance:
          return isChecked ? 'สอดคล้อง' : 'ไม่สอดคล้อง';
        case TaskProcess.ApproveRelevant:
          return isChecked ? 'อนุมัติ' : 'ไม่อนุมัติ';
        case TaskProcess.ApproveConsistance:
          return isChecked ? 'อนุมัติ' : 'ไม่อนุมัติ';
        case TaskProcess.Response:
          return isChecked ? 'สอดคล้อง' : 'ไม่สอดคล้อง';
        case TaskProcess.ApproveResponse:
          return isChecked ? 'อนุมัติ' : 'ไม่อนุมัติ';
      }
    }

    const ContentElement = keyactList.map((content,index) => {
      return(
        <View key={index} style={{ width: '100%' }}>
          {
            index > 0 ?
            <View style={{borderWidth: 0.8, borderColor:'#EEEEEE', marginVertical: 10 }}/> : <></>
          }
          <View style={[styles.RowView, {justifyContent:'space-between', flexGrow: 1 }]}>
            <Text style={[styles.TextContent, {color:getTextcolor(content.isChecked), width: '70%'}]} numberOfLines={1}>
              ข้อ {content.order} {content.keyReq}
            </Text>
            <Text style={styles.TextContent}>
              { content.isChecked === undefined? 'ยังไม่ประเมิน': getLabel(content.isChecked) }
            </Text>
          </View>

          {/* assign detail */}
          {
            taskProcess === TaskProcess.Consistance && content.isChecked === false
            ? (<View style={{ flexDirection: 'row', backgroundColor: 'transparent', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                  {/* responsible person */}
                  {
                    content.responsePersonListLabel
                    ? 
                      content.responsePersonListLabel.map((p, index) => 
                        responsePersonWrapper(p, index)
                      )
                    : <></>
                  }

                  {/* cost */}
                  <View style={{ flexDirection: 'row', backgroundColor: ColorStyle.LightGreen.color, borderRadius: 8, 
                    marginRight: 5, paddingHorizontal: 5, alignItems: 'center' }}>
                    <Entypo name="wallet" size={14} color={ColorStyle.Green.color} style={{ marginRight: 5 }} />
                    <Text style={[TextStyle.Content, ColorStyle.Green]}>{ content.cost }</Text>
                  </View>
                </View>

                {/* date */}
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="calendar" size={14} color={ColorStyle.Green.color} style={{ marginRight: 5 }} />
                  <Text style={[TextStyle.Content, ColorStyle.Green]}>{ format(new Date(content.dueDate ?? new Date()), 'dd/MM/yyyy') }</Text>
                </View>
              </View>)
            : <></>
          }

          {/* notation */}
          {
            content.notation ? <Text style={[TextStyle.Content, {marginTop: 3}]}>หมายเหตุ : {content.notation}</Text> : <></>
          }
        </View>
      )
    })

    const ResultWrapper = () => {
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
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 2, marginRight: 5, alignItems: 'center' }}>
                <AntDesign name="check" size={16} color={ColorStyle.Green.color} style={{ marginRight: 5 }}/>
                <Text style={[TextStyle.Content, ColorStyle.Green]}>{ totalChecked }</Text>
              </View>
              <View style={{ backgroundColor: ColorStyle.LightRed.color, borderRadius: 8, 
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 2, marginRight: 5, alignItems: 'center' }}>
                <Feather name="x" size={16} color={ColorStyle.Danger.color} style={{ marginRight: 5 }}/>
                <Text style={[TextStyle.Content, ColorStyle.Danger]}>{ totalUncheck }</Text>
              </View>
              <View style={{ backgroundColor: ColorStyle.LightGrey.color, borderRadius: 8, 
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 2, alignItems: 'center' }}>
                <AntDesign name="minuscircleo" size={16} color={ColorStyle.Grey.color} style={{ marginRight: 5 }} />
                <Text style={[TextStyle.Content, ColorStyle.Grey]}>{ totalNotDo }</Text>
              </View>
            </View>
            
            <View style={{ backgroundColor: ColorStyle.LightGrey.color, 
              paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8 }}>
              <Text style={[TextStyle.Content]}>
                ทั้งหมด {keyactList.length ?? 0} ข้อ
              </Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
            <ScrollView contentContainerStyle={{ flexGrow:1, width: '100%' }}>
              {ContentElement}
            </ScrollView>
          </View>
        </View>
      )
    }
    
    return isLoading ? <LoadingElement/> : <ResultWrapper/>;
}

const responsePersonWrapper = (name: string, index: number) => {
  return (
    <View key={'person-'+index} style={{ backgroundColor: ColorStyle.LightGreen.color, borderRadius: 8, marginRight: 5, paddingHorizontal: 5 }}>
      <Text style={[TextStyle.Content, ColorStyle.Green]}>{ name }</Text>
    </View>
  )
}

const getTextcolor = (Assessment: boolean | undefined) => {
  return(
    Assessment === undefined
    ? ColorStyle.Grey.color
    : Assessment
    ? ColorStyle.Green.color
    : ColorStyle.Danger.color
  )
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