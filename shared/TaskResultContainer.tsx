import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { ViewStyle } from '../style/ViewStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyActionAssessmentModel, TaskAssessmentModel } from '../model/Task.model';
import { User } from '../constants/UserInfo';
import { environment } from '../environment';
import TaskResultScreen from './TaskResultScreen';


export default function TaskResultContainerScreen({ navigation, route }: RootStackScreenProps<'TaskResultContainer'>) {
  const { taskId, keyactList } = route.params;

  const SaveAssessment = () => {
    let element = new KeyActionAssessmentModel();
    let assessmentList = new Array<KeyActionAssessmentModel>();
    keyactList.forEach(x => {
      element = new KeyActionAssessmentModel();
      element.keyActId = x.id;
      element.isChecked = x.isRelated ?? false;
      element.notation = x.notation ?? '';
      assessmentList.push(element)
    });

    let request = new TaskAssessmentModel();
    request.employeeId = User.emdId;
    request.taskId = taskId;
    request.process = 1;
    request.keyActionList = assessmentList;

    fetch(`${environment.apiRaUrl}/api/Task/UpdateTaskRelevant`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      navigation.navigate('Task')
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={styles.Container}>
      <View style={[ViewStyle.RowContainer, { paddingHorizontal: 0}]}>
        <TaskResultScreen taskId={taskId} keyactList={keyactList} />
      </View>

      <SafeAreaView style={{ width: '100%' }}>
        <Pressable style={styles.button} onPress={() => SaveAssessment()}>
          <Text style={[styles.TextHeader, {color:'#fff'}]}>ส่งอนุมติ</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
  },
  button: {
    backgroundColor:'#13AF82',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal: 10
  },
});