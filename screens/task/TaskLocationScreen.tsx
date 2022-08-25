import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal ,Pressable} from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { TaskContentModel } from '../../model/Task';
import { TaskData } from '../../constants/Task'

import { CardStyle } from '../../style/CardStyle';
import { TaskDatetimeStatus } from '../../enum/TaskDatetimeStatus.enum';
import { ColorStyle } from '../../style/ColorStyle';
import { useNavigation } from '@react-navigation/native';

export default function TaskLocationScreen() {
  const [taskList, setTaskList] = useState(TaskData)
  const [keyword, onChangeKeyword] = useState<string>('')
  const navigation =  useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [relevantselected, setRelevantselected] = useState(true)
  const [relevantApproveselected, setRelevantApproveselected] = useState(true)
  const [consistanceselected, setConsistanceselected] = useState(true)
  const [consistanceApproveselected, setConsistanApproveceselected] = useState(true)

  const ContentElement = (contentItem: TaskContentModel, i: number, type: string) => {
    return(
      <View key={'content' + i}>
        <TouchableOpacity onPress={()=> navigation.navigate(type=='relevant'? 'TaskRelevantDetail' :type=='consistance'? 'TaskConsistanceDetail' :type=='relevantapprove'? 'TaskRADetail': 'TaskCADetail') } >
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
          { item.type=='relevant' ? 'ประเมินความเกี่ยวข้อง':item.type=='consistance'? 'ประเมินความสอดคล้อง':item.type=='relevantapprove'? 'รออนุมัติความเกี่ยวข้อง':'รออนุมัติความสอดคล้อง' }
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
          <TouchableOpacity  onPress={() =>setModalVisible(true)}>
            <View style={styles.Filter}>
              <AntDesign name="filter" size={25} color={'#13AF82'} />
              <Text style={[styles.AssignText, {color:'#13AF82'}]}>ตัวกรอง</Text>
            </View>
            {/* Filter Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {setModalVisible(!modalVisible)}} >
                <View style={styles.ModalContainer}>
                  <View style={styles.FilterWrapper}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)} >
                      <AntDesign name='left' size={20} color={'black'}/>
                    </Pressable>
                    <Text style={styles.TextHeader}>ตัวกรอง</Text>
                  </View>

                  <View style={{marginVertical:30, backgroundColor:'transparent'}}>
                      <TouchableOpacity onPress={() => setRelevantselected(!relevantselected)} style={[relevantselected? styles.FilterCardSelected : styles.FilterCardUnselected ]}>
                        <Text style={styles.TextContent}>ประเมินความเกี่ยวข้อง</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setConsistanceselected(!consistanceselected)}  style={[consistanceselected? styles.FilterCardSelected : styles.FilterCardUnselected ]}>
                        <Text style={styles.TextContent}>ประเมินความสอดคล้อง</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setRelevantApproveselected(!relevantApproveselected)} style={[relevantApproveselected? styles.FilterCardSelected : styles.FilterCardUnselected ]}>
                        <Text style={styles.TextContent}>รออนุมัติความเกี่ยวข้อง</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setConsistanApproveceselected(!consistanceApproveselected)} style={[consistanceApproveselected? styles.FilterCardSelected : styles.FilterCardUnselected ]}>
                        <Text style={styles.TextContent}>รออนุมัติความสอดคล้อง</Text>
                      </TouchableOpacity>
                  </View>

                </View>
            </Modal>
          </TouchableOpacity>
        </View>

        {/* task */}
        {/* { TaskElement } */}

        <View>
          {relevantselected?
            <View>
              <Text>ประเมินความเกี่ยวข้อง</Text>
              { TaskElementList(taskList[0].task, taskList[0].type)}
            </View>  
            : <></>
          }
          {consistanceselected?
            <View>
              <Text>ประเมินความสอดคล้อง</Text>
              { TaskElementList(taskList[1].task, taskList[1].type)}
            </View>  
            : <></>
          }
          {relevantApproveselected?
            <View>
              <Text>รออนุมัติความเกี่ยวข้อง</Text>
              { TaskElementList(taskList[2].task, taskList[2].type)}
            </View>  
            : <></>
          }
          {consistanceApproveselected?
            <View>
              <Text>รออนุมัติความสอดคล้อง</Text>
              { TaskElementList(taskList[3].task, taskList[3].type)}
            </View>  
            : <></>
          }
      </View>

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
    paddingTop:10,
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
    fontFamily: 'Mitr_400Regular',
    color: '#000',
  },
  SearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 50,
  },
  InputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width: '75%',
    backgroundColor: '#eeeeee',
    borderRadius: 20,
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
