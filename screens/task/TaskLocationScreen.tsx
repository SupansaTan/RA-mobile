import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal ,Pressable, ActivityIndicator} from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns'

import { Text, View } from '../../components/Themed';
import { TaskContentModel } from '../../model/Task';
import { TaskData } from '../../constants/Task'

import { CardStyle } from '../../style/CardStyle';
import { TaskDatetimeStatus } from '../../enum/TaskDatetimeStatus.enum';
import { ColorStyle } from '../../style/ColorStyle';
import { useNavigation } from '@react-navigation/native';
import { environment } from '../../environment';
import { TaskDetailModel, TaskListSortByProcessModel } from '../../model/Task.model';
import { TaskProcess } from '../../enum/TaskProcess.enum';
import { ViewStyle } from '../../style/ViewStyle';
import { TextStyle } from '../../style/TextStyle';
import Colors from '../../constants/Colors';
import { RootStackScreenProps } from '../../types';

export default function TaskLocationScreen({ navigation, route }: RootStackScreenProps<'TaskLocation'>) {
  const [taskList, setTaskList] = useState<Array<TaskListSortByProcessModel>>([])
  const [keyword, onChangeKeyword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { locationId } = route.params;

  useEffect(() => {
    const getTaskList = () => {
      setIsLoading(true);
      const url = keyword
        ? `${environment.apiRaUrl}/api/Task/GetTaskListByLocationId?locationId=${locationId}&keyword=${keyword.trim()}`
        : `${environment.apiRaUrl}/api/Task/GetTaskListByLocationId?locationId=${locationId}`

      fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setTaskList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getTaskList();
  }, [keyword]);

  const ContentElement = (contentItem: TaskDetailModel, i: number) => {
    return(
      <View key={`task-${contentItem.process}-${i}`}>
        <TouchableOpacity onPress={()=> navigation.navigate(getScreenRoute(contentItem.process), { taskId: contentItem.taskId }) }>
          <View style={ getCardColorClass(contentItem.datetimeStatus) }>
            <Text style={styles.TextHeader} numberOfLines={2}>{ contentItem.taskTitle }</Text>

            <View style={styles.DatetimeWrapper}>
              <MaterialCommunityIcons name="calendar-clock" size={20}
                color={ getTextColor(contentItem.datetimeStatus) } 
                style={{ marginRight: 5 }} />
              <Text style={[styles.TextContent, 
                { color: getTextColor(contentItem.datetimeStatus) }]}>
                { format(new Date(contentItem.dueDate), 'dd/MM/yyyy HH:mm') }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const TaskElementList = taskList?.map((content: TaskListSortByProcessModel, index: number) => {
    return (
      <View>
        <Text style={[TextStyle.Heading, { fontSize: 16, marginTop: 15 }]}>
          { getProcessLabel(content.taskProcess) }
        </Text>
        {
          content.taskList.map((task, index) => {
            return ContentElement(task, index);
          })
        }
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <View style={[ViewStyle.ColumnContainer, { marginBottom: 10 }]}>
        <View style={styles.SearchWrapper}>
          {/* search */}
          <View style={styles.InputWrapper}>
            <Feather name='search' style={{marginHorizontal:5}} size={20} color={'#6c6c6c'}  />
            <TextInput
              style={styles.InputText}
              onChangeText={(searchTerm) => onChangeKeyword(searchTerm)}
              value={keyword}
              placeholder='พ.ร.บ/กฎหมาย'
            />
          </View>
        </View>

        {/* task list */}
        <View style={[ViewStyle.RowContainer, { paddingHorizontal: 0 }]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            { isLoading ? <LoadingElement/>: taskList ? TaskElementList : <></> }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const getCardColorClass = (status: TaskDatetimeStatus) => {
  switch(status) {
    case TaskDatetimeStatus.Overdue:
      return CardStyle.Danger;
    case TaskDatetimeStatus.Today:
      return CardStyle.Warning;
    case TaskDatetimeStatus.Remain:
      return CardStyle.Grey;
  }
}

const getTextColor = (status: TaskDatetimeStatus) => {
  switch(status) {
    case TaskDatetimeStatus.Overdue:
      return ColorStyle.Danger.color;
    case TaskDatetimeStatus.Today:
      return ColorStyle.Warning.color;
    case TaskDatetimeStatus.Remain:
      return ColorStyle.Grey.color;
  }
}

const getProcessLabel = (process: TaskProcess) => {
  switch(process) {
    case TaskProcess.Relevant:
      return 'ประเมินความเกี่ยวข้อง';
    case TaskProcess.ApproveRelevant:
      return 'รออนุมัติความเกี่ยวข้อง';
    case TaskProcess.Consistance:
      return 'ประเมินความสอดคล้อง';
    case TaskProcess.ApproveConsistance:
      return 'รออนุมัติความสอดคล้อง';
    case TaskProcess.Response:
      return 'รอดำเนินการให้สอดคล้อง';
  }
}

const getScreenRoute = (process: TaskProcess): string => {
  switch(process) {
    case TaskProcess.Relevant:
      return 'TaskRelevantDetail';
    case TaskProcess.ApproveRelevant:
      return 'TaskRADetail';
    case TaskProcess.Consistance:
      return 'TaskConsistanceDetail';
    case TaskProcess.ApproveConsistance:
      return 'TaskCADetail';
    case TaskProcess.Response:
      return '';
  }
  return '';
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
  },
  TypeText: {
    fontSize: 16,
    marginTop: 10,
    color: '#6c6c6c',
    fontFamily: 'Mitr_500Medium'
  },
  AssignText: {
    fontSize: 16,
    color: '#4a4a4a',
    justifyContent: 'center',
    fontFamily: 'Mitr_500Medium'
  },
  DatetimeWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextContent: {
    fontSize: 13,
    fontFamily: 'Mitr_400Regular',
    color: '#000',
  },
  SearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginRight: 10,
    height: 50,
  },
  InputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width: '100%',
    backgroundColor: '#eeeeee',
    borderRadius: 20,
  },
  InputText: {
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
    height: 40,
    width:'100%',
  },
  Filter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    marginTop: 90,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  FilterWrapper: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:'100%',
    backgroundColor: '#fff',
  },
  FilterCardSelected: {
    backgroundColor: '#d2f7ed',
    borderColor: 'green',
    borderRadius:20,
    borderWidth:1,
    padding:5,
    paddingHorizontal:20,
    marginVertical:10,
  },
  FilterCardUnselected: {
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius:20,
    borderWidth:1,
    padding:5,
    paddingHorizontal:20,
    marginVertical:10,
  },
});
