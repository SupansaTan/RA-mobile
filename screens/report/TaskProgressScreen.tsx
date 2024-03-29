import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { TaskContentModel } from '../../model/Task';
import { TaskList } from '../../constants/Report';

import { ViewStyle } from '../../style/ViewStyle';
import { CardStyle } from '../../style/CardStyle';
import { TaskDatetimeStatus } from '../../enum/TaskDatetimeStatus.enum';
import { ColorStyle } from '../../style/ColorStyle';

export function ReportTaskProgressScreen() {
  const [taskList, setTaskList] = useState(TaskList)
  const [keyword, onChangeKeyword] = useState<string>('')
  const navigation =  useNavigation()

  const ContentElement = (contentItem: TaskContentModel, i: number, type: string) => {
    return(
      <View key={'content' + i}>
        <TouchableOpacity onPress={() => navigation.navigate('ReportTaskDetail')}>
          <View style={ getCardColorClass(contentItem.timestatus) }>
            <Text style={styles.TextHeader}>{ contentItem.title }</Text>

            <View style={styles.DatetimeWrapper}>
              <MaterialCommunityIcons name="calendar-clock" size={20}
                color={ getTextColor(contentItem.timestatus) } 
                style={{ marginRight: 5 }} />
              <Text style={[styles.TextContent, 
                { color: getTextColor(contentItem.timestatus) }]}>
                { contentItem.datetime }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const TaskElementList = (contentData: Array<TaskContentModel>, taskType: string) => {
    return (
      contentData.map((content: TaskContentModel, index: number) => {
        return ContentElement(content, index, taskType)
      })
    )
  }

  const TaskElement = taskList.map((item, index) => {
    return(
      <View key={index}>
        {/* date */}
        <Text style={styles.TypeText}>
          { item.type=='relevant' ? 'ประเมินความเกี่ยวข้อง':item.type=='consistance'? 'ประเมินความสอดคล้อง':'รออนุมัติ' }
        </Text>

        {/* content */}
        { TaskElementList(item.task, item.type) }
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>

          {/* search */}
          <View style={styles.InputWrapper } >
            <Feather name='search' style={{marginHorizontal:5}} size={20} color={'#6c6c6c'}  />
            <TextInput
              style={[styles.InputText, {width:'100%'}]}
              onChangeText={onChangeKeyword}
              value={keyword}
              placeholder='พ.ร.บ/กฎหมาย'
            />
          </View>

        {/* task */}
        { TaskElement }

      </ScrollView>
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

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  ContentContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 4,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  ContentWrapper: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  DatetimeWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  AssignWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
    backgroundColor: 'transparent'
  },
  AssginCard: {
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff66'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextContent: {
    fontSize: 13,
    fontFamily: 'Mitr_400Regular'
  },
  InputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width:'100%',
    backgroundColor: '#eeeeee',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  InputText: {
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
    height: 40,
  },
  Filter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
