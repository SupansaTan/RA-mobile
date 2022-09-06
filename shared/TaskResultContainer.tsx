import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { ViewStyle } from '../style/ViewStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyActionAssessmentModel, TaskAssessmentModel } from '../model/Task.model';
import { User } from '../constants/UserInfo';
import { environment } from '../environment';
import TaskResultScreen from './TaskResultScreen';
import { TaskProcess } from '../enum/TaskProcess.enum';
import { ColorStyle } from '../style/ColorStyle';


export default function TaskResultContainerScreen({ navigation, route }: RootStackScreenProps<'TaskResultContainer'>) {
  const { taskId, keyactList, taskProcess } = route.params;
  const [ disableButton, setDisableBtn ] = useState<boolean>(true);

  useEffect(() => {
    const totalNotDo = keyactList.filter(x => x.isChecked === undefined).length;
    setDisableBtn(totalNotDo > 0);
  }, [])

  const getApiPath = () => {
    switch(taskProcess) {
      case TaskProcess.Relevant:
        return 'UpdateTaskRelevant';
      case TaskProcess.ApproveRelevant:
        return 'UpdateTaskApproveRelevant';
      case TaskProcess.Consistance:
        return 'UpdateTaskConsistance';
      case TaskProcess.ApproveConsistance:
        return 'UpdateTaskApproveConsistance';
      case TaskProcess.Response:
        return 'UpdateTaskResponse';
      case TaskProcess.ApproveResponse:
        return 'UpdateTaskApproveResponse';
    }
  }

  const SaveAssessment = () => {
    let element = new KeyActionAssessmentModel();
    let assessmentList = new Array<KeyActionAssessmentModel>();
    keyactList.forEach(x => {
      element = new KeyActionAssessmentModel();
      element.keyActId = x.id;
      element.isChecked = x.isChecked ?? false;
      element.notation = x.notation ?? '';

      if (taskProcess === TaskProcess.Consistance) {
        element.cost = x?.cost ?? 0;
        element.dueDate = x?.dueDate;
        element.responsePersonId = x?.responsePersonList ?? [];
      }
      assessmentList.push(element)
    });

    let request = new TaskAssessmentModel();
    request.employeeId = User.emdId;
    request.taskId = taskId;
    request.process = taskProcess;
    request.keyActionList = assessmentList;

    console.log(JSON.stringify(request))
    fetch(`${environment.apiRaUrl}/api/Task/${getApiPath()}`, {
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
        <TaskResultScreen taskId={taskId} keyactList={keyactList} taskProcess={taskProcess} />
      </View>

      <SafeAreaView style={{ width: '100%' }}>
        <Pressable style={[styles.button, { backgroundColor: disableButton? ColorStyle.LightGrey.color : ColorStyle.Green.color}]}
          onPress={() => SaveAssessment()} disabled={disableButton}>
          <Text style={[styles.TextHeader, {color: disableButton? ColorStyle.Grey.color:'#fff'}]}>ส่งอนุมติ</Text>
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