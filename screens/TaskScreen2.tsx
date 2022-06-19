import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather  } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { TaskContentModel } from '../model/Task';
import { TaskData } from '../constants/Task'

export default function TaskScreen2({ path }: { path: string }) {
  const [taskList, setTaskList] = useState(TaskData)
  const [keyword, onChangeKeyword] = useState<string>('')

  const ContentElement = (contentItem: TaskContentModel, i: number, type: string) => {
    return(
      <View key={'content' + i}>
        <TouchableOpacity>
          <View style={styles.ContentContainer} 
            accessibilityRole='button'>

            {/* title & datetime */}
            <View style={styles.ContentWrapper}>
              <Text style={styles.TextHeader}>{ contentItem.title }</Text>

              <View style={styles.DatetimeWrapper}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color={ contentItem.timestatus=='overdue' ? '#FF4F4F':contentItem.timestatus=='today'? '#FF7B00':'#6c6c6c' } 
                  style={{ marginRight: 5 }} />
                <Text style={[styles.TextContent, { color: contentItem.timestatus=='overdue' ? '#FF4F4F':contentItem.timestatus=='today'? '#FF7B00':'#6c6c6c' }]}>
                  { contentItem.datetime }
                </Text>
              </View>
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

        <View style={styles.SearchWrapper}>
          {/* search */}
          <View style={styles.InputWrapper } >
            <Feather name='search' style={{marginHorizontal:5}} size={20} color={'#6c6c6c'}  />
            <TextInput
              style={styles.InputText}
              onChangeText={onChangeKeyword}
              value={keyword}
              placeholder='พ.ร.บ/กฎหมาย'
            />
          </View>

          {/* filter */}
          <TouchableOpacity>
            <View style={styles.Filter}>
              <MaterialCommunityIcons name='filter-variant' style={{marginHorizontal:5}} color={'#13AF82'} size={40} />
              <Text style={[styles.AssignText, {color:'#13AF82'}]}>ตัวกรอง</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* task */}
        { TaskElement }

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
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
    fontSize: 14,
    color: '#4a4a4a',
    justifyContent: 'center',
    fontFamily: 'Poppins_500Medium'
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
    fontFamily: 'Mitr_500Medium'
  },
  TextContent: {
    fontSize: 13,
    fontFamily: 'Mitr_400Regular'
  },
  SearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    height: 50,
  },
  InputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width:250,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  InputText: {
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
    height: 40,
    width:250,
  },
  Filter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});