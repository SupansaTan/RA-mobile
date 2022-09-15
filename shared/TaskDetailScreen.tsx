import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import { format } from 'date-fns'

import { Text, View } from '../components/Themed';
import { environment } from '../environment';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';
import { ColorStyle } from '../style/ColorStyle';
import { TaskProcess } from '../enum/TaskProcess.enum';
import { TaskInfoModel } from '../model/Task.model';
import { useNavigation } from '@react-navigation/native';
import { TaskDatetimeStatus } from '../enum/TaskDatetimeStatus.enum';

export default function TaskDetailScreen({ taskId, taskProcess }: { taskId: string, taskProcess: number }) {
  const [taskDetail, setTaskDetail] = useState<TaskInfoModel>(new TaskInfoModel());
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getTaskDetail = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Task/GetTaskDetail?taskId=${taskId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setTaskDetail(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getTaskDetail();

    return () => { setTaskDetail(new TaskInfoModel()) }
  }, []);

  const getTaskProcessLabel = () => {
    switch(taskProcess) {
      case TaskProcess.Relevant:
        return 'รอประเมินความเกี่ยวข้อง'
      case TaskProcess.Consistance:
        return 'รอประเมินความสอดคล้อง'
      case TaskProcess.ApproveRelevant:
        return 'รออนุมัติความเกี่ยวข้อง'
      case TaskProcess.ApproveConsistance:
        return 'รออนุมัติความสอดคล้อง'
      case TaskProcess.Response:
        return 'รอดำเนินการให้สอดคล้อง'
      case TaskProcess.ApproveResponse:
        return 'รออนุมัติการปฏิบัติให้สอดคล้อง'
    }
  }

  const TaskDetailWrapper = () => {
    return (
      <View style={styles.Container}>
        <View style={styles.ContentContainer}>
          <View style={styles.GreenCard}>
            <Text style={styles.TextHeader}>{ taskDetail.actType }</Text>

            {/* law detail */}
            <View style={styles.GreenCardItem}>
              <MaterialCommunityIcons name='text-box-search-outline' size={25}/>
              <View style={{ flexDirection:'column', backgroundColor: 'transparent', marginLeft: 10, flex: 1 }}>
                <Text style={styles.TextContent}>
                  { taskDetail.taskTitle }
                </Text>

                <View style={{flexDirection:'row', backgroundColor: 'transparent'}}>
                  <View style={styles.WhiteCard}>
                    <Text style={TextStyle.Content}>ทั้งหมด { taskDetail.totalKeyAct } ข้อ</Text>
                  </View>
                  <TouchableOpacity style={styles.WhiteCard}
                    onPress={() => navigation.navigate('LawDetailContainer', { taskId: taskId, taskProcess: taskProcess})}
                    >
                    <Text style={TextStyle.Content}>ดูรายละเอียด</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* location name */}
            <View style={styles.GreenCardItem}>
              <Feather name="map-pin" size={25} color={ColorStyle.Green.color} style={{marginRight:5}}/>
              <Text style={[styles.TextContent, ColorStyle.Green]}>
                { taskDetail.locationName }
              </Text>
            </View>

            {/* due date */}
            <View style={styles.GreenCardItem}>
              <MaterialCommunityIcons name="calendar-blank" size={25} color={ColorStyle.Green.color} style={{marginRight:5}}/>
              <Text style={[styles.TextContent, ColorStyle.Green]}>
                { format(new Date(taskDetail.dueDate), 'dd/MM/yyyy HH:mm') }
              </Text>
            </View>
          </View>
        </View>

        {/* task status */}
        <View style={styles.StatusContainer}>
          <MaterialCommunityIcons name="circle-slice-5" size={25} color={getTimeStatusColor(taskDetail.datetimeStatus)}
            style={{marginRight:5}}/>
          <Text style={[styles.TextContent, {color: getTimeStatusColor(taskDetail.datetimeStatus)}]}>
            สถานะ: { getTaskProcessLabel() }
          </Text>
        </View>
      </View>
    )
  }

  return isLoading ? <LoadingElement/> : <TaskDetailWrapper/>;
}

const getTimeStatusColor = (timeStatus: TaskDatetimeStatus) => {
  switch(timeStatus) {
    case TaskDatetimeStatus.Today:
      return ColorStyle.Warning.color;
    case TaskDatetimeStatus.Remain:
      return ColorStyle.Grey.color;
    case TaskDatetimeStatus.Overdue:
      return ColorStyle.Danger.color;
  }
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
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 10
  },
  TextHeader: {
    fontSize: 20,
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
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  GreenCardItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: 5,
  },
  WhiteCard: {
    backgroundColor: '#fff',
    paddingVertical: 2,
    borderRadius:20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginVertical: 5
  },
});
