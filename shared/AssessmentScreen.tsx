import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, useWindowDimensions, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Button as ButtonSubmit, SafeAreaView, Pressable, InputAccessoryView, Modal, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from "@rneui/themed";
import { Button } from 'react-native-elements';

import { MaterialIcons, Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { environment } from '../environment';
import { KeyActModel } from '../model/KeyAct.model';
import { AllKeyActLoggingAssessmentModel, KeyActLoggingModel, LoggingAssessmentModel,  } from '../model/Logging.model';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';
import { TaskProcess } from '../enum/TaskProcess.enum';
import MultiSelect from 'react-native-multiple-select';
import { ColorStyle } from '../style/ColorStyle';
import { EmployeeInfoModel } from '../model/Employee.model';
import { format } from 'date-fns';

export default function TaskAssessmentScreen({ navigation, route }: RootStackScreenProps<'Assessment'>) {
  const layout = useWindowDimensions();
  const [datalist, setDatalist] = useState<Array<KeyActModel>>([])
  const [keyorder, setKeyorder] = useState(1)
  const [data, setData] = useState(datalist[(keyorder-1)]);
  const [allLogging, setAllLogging] = useState<Array<AllKeyActLoggingAssessmentModel>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggingList, setLoggingList] = useState<Array<LoggingAssessmentModel>>([]);
  const { taskId, taskProcess } = route.params;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'สาระสำคัญ' },
    { key: '2', title: 'เกณฑ์ชี้วัด' },
    { key: '3', title: 'ความถี่' },
    { key: '4', title: 'แนวทางปฎิบัติ' },
    { key: '5', title: 'ประวัติการประเมิน' }
  ]);

  useEffect(() => {
    const getKeyActList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/KeyAction/GetAllKeyAction?taskId=${taskId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setDatalist(res.data);
        setData(res.data[keyorder - 1]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const getLogList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/KeyAction/GetLoggingAssessment?taskId=${taskId}&process=${taskProcess - 1}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setLoggingList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const getConsistanceLogList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/KeyAction/GetConsistanceLogList?taskId=${taskId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setLoggingList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const getAllLogList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/KeyAction/GetAllLoggingAssessment?taskId=${taskId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setAllLogging(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getKeyActList();
    if (taskProcess === TaskProcess.ApproveConsistance) {
      getConsistanceLogList();
      getAllLogList();
    }
    else if (taskProcess > TaskProcess.Relevant) {
      getLogList();
      getAllLogList();
    }

    return () => { setLoggingList([]); setDatalist([]); setData(new KeyActModel())  }
  }, []);

  useEffect(() => {
    let currentKeyact = datalist[keyorder - 1];
    setData(currentKeyact);

    return () => { }
  }, [keyorder])

  const KeyActButton = () => {
    return (
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        backgroundColor: 'white', paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row',  backgroundColor: 'white' }}>
          <Button
            type="clear"
            icon={
              <FontAwesome name="angle-double-left" size={28} color={keyorder > 1? Colors.light.tint : '#BEBEBE'} />
            }
            buttonStyle={[styles.ArrowButton, {
              paddingHorizontal: 10,
              backgroundColor: keyorder < 2 ? '#EEEEEE' : '#DEF4EC',
            }]}
            onPress={()=> { setKeyorder(1); setData(datalist[0]); }}
            disabled={keyorder===1? true:false }
          />
          <Button
            type="clear"
            icon={
              <FontAwesome name="angle-left" size={28} color={keyorder > 1? Colors.light.tint : '#BEBEBE'} />
            }
            buttonStyle={[styles.ArrowButton, {
              paddingHorizontal: 13,
              marginLeft: 5,
              backgroundColor: keyorder < 2 ? '#EEEEEE' : '#DEF4EC',
            }]}
            onPress={()=> { setKeyorder(keyorder-1); setData(datalist[keyorder-1]); }}
            disabled={keyorder===1? true:false }
          />
        </View>
        <Text style={styles.TextHeader}>ข้อที่ {keyorder}</Text>
        <View style={{ flexDirection: 'row',  backgroundColor: 'white' }}>
          <Button
            type="clear"
            icon={
              <FontAwesome name="angle-right" size={28} color={keyorder >= datalist.length? '#BEBEBE' : Colors.light.tint} />
            }
            buttonStyle={[styles.ArrowButton,{
              backgroundColor: keyorder >= datalist.length? '#EEEEEE' : '#DEF4EC',
              paddingHorizontal: 13,
              marginRight: 5,
            }]}
            onPress={()=> { setKeyorder(keyorder+1); setData(datalist[keyorder-1]); }}
            disabled={keyorder===datalist.length? true:false }
          />
          <Button
            type="clear"
            icon={
              <FontAwesome name="angle-double-right" size={28} color={keyorder===datalist.length? '#BEBEBE' : Colors.light.tint } />
            }
            buttonStyle={[ styles.ArrowButton, {
              paddingHorizontal: 10,
              backgroundColor: keyorder >= datalist.length? '#EEEEEE' : '#DEF4EC',
            }]}
            onPress={()=> { setKeyorder(datalist.length); setData(datalist[datalist.length-1]); } }
            disabled={keyorder===datalist.length? true:false }
          />
        </View>
      </View>
    )
  }

  const TabContainer = () => {
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={
          SceneMap({
            '1': () => KeyActContainer(data?.keyReq),
            '2': () => KeyActContainer(data?.standard),
            '3': () => KeyActContainer(data?.frequency),
            '4': () => KeyActContainer(data?.practice),
            '5': () => AssessemntHistoryContainer(allLogging[keyorder - 1]?.loggingList ?? [])
          })
        }
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{width: '100%', backgroundColor: 'white' }}
        renderTabBar={props => <TabBar {...props} 
          indicatorStyle={{backgroundColor: '#13AF82'}}
          pressColor={'#EEEEEE'}
          style={{backgroundColor: 'white', maxHeight: 48, paddingHorizontal: 0 }}
          activeColor={'#13AF82'}
          inactiveColor={'#B9B9B9'}
          labelStyle={[TextStyle.HeadingGrey, { fontSize: 19 }]}
          tabStyle={{ width: 'auto' }}
          scrollEnabled={true}
          bounces={false}
        />}
      />
    )
  }

  const getAssessemntLabel = () => {
    switch(taskProcess) {
      case TaskProcess.Relevant:
        return 'ความเกี่ยวข้อง';
      case TaskProcess.Consistance:
        return 'ความสอดคล้อง';
      case TaskProcess.Response:
        return 'ความสอดคล้อง'; 
    }
  }

  const AssessmentContainer = () => {
    const [related, setRelated] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [nonRelated, setNonRelated] = useState(data?.isChecked === undefined ? false : !data?.isChecked);

    const updateKeyActData = (related: boolean, nonRelated: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!related && !nonRelated) ? undefined : related;
        }
      })
      setRelated(related);
      setNonRelated(nonRelated);
      setDatalist(keyActList);
    }

    return (
      <View style={[styles.GreenCard]}>
        <Text style={[TextStyle.Heading,{fontSize: 19, color: '#13AF82'}]}>{ getAssessemntLabel() }</Text>
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox 
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>เกี่ยวข้อง</Text>}
            checked={related}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!related, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่เกี่ยวข้อง</Text>} 
            checked={nonRelated}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !nonRelated) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>
      </View>
    )
  }

  const ConsistanceAssessmentContainer = () => {
    const [consist, setConsist] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [nonConsist, setNonConsist] = useState(data?.isChecked === undefined ? false : !data?.isChecked);
    const [showAssign, setShowAssign] = useState<boolean>(false);
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [employee, setEmployee] = useState([]);
    const [employeeList, setEmployeeList] = useState<Array<EmployeeInfoModel>>([]);
    const [employeeSelect, setEmployeeSelect] = useState<any[]>([]);
    const [employeeLabel, setEmployeeSelectLabel] = useState<any[]>([]);
    const [cost, setCost] = useState('');

    useEffect(() => {
      const getEmployeeList = () => {
        fetch(`${environment.apiRaUrl}/api/Employee/GetEmployeeList?taskId=${taskId}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((res) => {
          setEmployee(res.data);
          setEmployeeList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      };
  
      getEmployeeList();
  
      return () => { setEmployee([]) }
    }, []);

    const onSaveAssign = () => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.responsePersonList = employeeSelect;
          x.responsePersonListLabel = employeeLabel;
          x.dueDate = dueDate;
          x.cost = Number(cost);
        }
      })
      setDatalist(keyActList);
      setShowAssign(!showAssign);
    }

    const updateKeyActData = (consist: boolean, nonConsist: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!consist && !nonConsist) ? undefined : consist;
        }
      })
      setConsist(consist);
      setNonConsist(nonConsist);
      setDatalist(keyActList);
    }

    const onEmployeeSelectChange = (emp: any[]) => {
      setEmployeeSelect(emp);

      let empList: any[] = [];
      emp.forEach(e => {
        empList.push(employeeList.find(x => x.employeeId === e)?.name)
      })
      setEmployeeSelectLabel(empList);
    }

    const OnDueDateChange = (event: any, selectedDate: any) => {
      setDueDate(new Date(selectedDate));
    };

    return (
      <View style={[styles.GreenCard]}>
        <Text style={[TextStyle.Heading,{fontSize: 19, color: '#13AF82'}]}>{ getAssessemntLabel() }</Text>

        {/* checkbox */}
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>สอดคล้อง</Text>}
            checked={consist}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!consist, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่สอดคล้อง</Text>} 
            checked={nonConsist}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !nonConsist) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>

        {
          nonConsist ? 
          <View style={styles.AssignWrapper}>
            <Pressable onPress={() => setShowAssign(true)} style={{ padding:10, borderRadius: 8, width:'100%', alignItems:'center'}}>
              <Text style={[styles.GreenCardText, { color: 'white' }]}>มอบหมายงาน</Text>
            </Pressable>
          </View> : <></>
        }
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAssign}
          onRequestClose={() => {setShowAssign(!showAssign)}}
        >
          <View style={styles.ModalContainer}>
            <Pressable onPress={() => setShowAssign(!showAssign)} >
              <AntDesign name='left' size={20} color={'black'}/>
            </Pressable>
              
            <View style={{ flexDirection: 'column', height: '100%' }}>
              <View style={{ flex:1, justifyContent:'flex-start', width: '100%', backgroundColor: 'white' }}>
                <Text style={[TextStyle.Heading, { marginVertical: 10 }]}>ผู้รับผิดชอบ <Text style={ColorStyle.Danger}>*</Text></Text>
                <View style={{ width:'100%', backgroundColor:'transparent'}}>
                  <MultiSelect
                    hideTags
                    items={employee}
                    uniqueKey="employeeId"
                    onSelectedItemsChange={(item) => onEmployeeSelectChange(item)}
                    selectedItems={employeeSelect}
                    selectText="Select Employee"
                    searchInputPlaceholderText="Search Employee..."
                    noItemsText='Not found employee'
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC', fontSize: 18, paddingVertical: 10 }}
                    submitButtonColor="#00BFA5"
                    submitButtonText="Submit Selected"
                    styleItemsContainer={{ paddingVertical: 5 }}
                    fontSize={18}
                    itemFontSize={18}
                  />
                </View>

                {
                  employeeLabel.length > 0 ?
                  <Text style={[TextStyle.Heading, { marginTop: 10 }]}>รายชื่อผู้รับผิดชอบ</Text>
                  : <></>
                }
                {
                  employeeLabel.map((item, index) => 
                  <View key={index} style={{marginLeft:10,marginVertical:5, backgroundColor:'transparent'}}>
                    <Text style={TextStyle.Content}>{'\u2022' + ' ' + item}</Text>
                  </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', marginTop:10}}>
                  <Text style={TextStyle.Heading}>กำหนดวันเสร็จ <Text style={ColorStyle.Danger}>*</Text></Text>
                  <DateTimePicker
                    testID="duedatePicker"
                    value={dueDate}
                    mode={'date'}
                    onChange={OnDueDateChange}
                    minimumDate={new Date()}
                    is24Hour
                    locale='th-TH'
                    dateFormat='day month year'
                    style={{ flex: 1 }}
                  />
                </View>
                
                <Text style={[TextStyle.Heading, {marginTop:10}]}>งบประมาณ <Text style={ColorStyle.Danger}>*</Text></Text>
                <TextInput 
                  style={[styles.InputText, {borderColor: '#B9B9B9', width:'100%' }]}
                  defaultValue={'0'}
                  onChangeText={setCost}
                  value={cost}
                  numberOfLines={1}
                  keyboardType="numeric"
                  placeholder='งบประมาณ'
                  inputAccessoryViewID='Close'
                />
              </View>

              <SafeAreaView>
                <Pressable 
                  onPress={() => onSaveAssign()} 
                  style={{backgroundColor:'#13AF82', width:'100%', alignItems:'center', justifyContent:'center',borderRadius: 8, height:50 }} >
                  <Text style={[styles.TextHeader, {color:'#fff'}]}>บันทึก</Text>
                </Pressable>
              </SafeAreaView>
            </View> 
          </View>
        </Modal>
      </View>
    )
  }

  const ResponsibleAssessmentContainer = () => {
    const [consisted, setConsist] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [inconsisted, setInconsisted] = useState(data?.isChecked === undefined ? false : !data?.isChecked);

    const updateKeyActData = (consisted: boolean, inconsisted: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!consisted && !inconsisted) ? undefined : consisted;
        }
      })
      setConsist(consisted);
      setInconsisted(inconsisted);
      setDatalist(keyActList);
    }

    return (
      <View style={[styles.GreenCard]}>
        <Text style={[TextStyle.Heading,{fontSize: 19, color: '#13AF82'}]}>{ getAssessemntLabel() }</Text>
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox 
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>สอดคล้อง</Text>}
            checked={consisted}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!consisted, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่สอดคล้อง</Text>} 
            checked={inconsisted}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !inconsisted) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>
      </View>
    )
  }

  const ApproveRelevantAssessmentContainer = () => {
    const [approve, setApprove] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [disapprove, setDisapprove] = useState(data?.isChecked === undefined ? false : !data?.isChecked);
    const [notation, setNotation] = useState<string>();
    const [isRelated, setIsRelated] = useState<boolean>();

    useEffect(() => {
      setNotation(loggingList[keyorder - 1]?.notation ?? '');
      setIsRelated(loggingList[keyorder - 1]?.status);
    }, [])

    const updateKeyActData = (approve: boolean, disapprove: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!approve && !disapprove) ? undefined : approve;
        }
      })
      setApprove(approve);
      setDisapprove(disapprove);
      setDatalist(keyActList);
    }

    return (
      <View style={[styles.GreenCard]}>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '100%' }}>
          <Text style={[TextStyle.Heading,{fontSize: 18}]}>ความเกี่ยวข้อง : { isRelated ? 'เกี่ยวข้อง':'ไม่เกี่ยวข้อง' }</Text>
          <Text style={[TextStyle.Heading,{fontSize: 18}]}>หมายเหตุ : { notation }</Text>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>อนุมัติ</Text>}
            checked={approve}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!approve, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่อนุมัติ</Text>} 
            checked={disapprove}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !disapprove) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>
      </View>
    )
  }

  const ApproveConsistanceAssessmentContainer = () => {
    const [approve, setApprove] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [disapprove, setDisapprove] = useState(data?.isChecked === undefined ? false : !data?.isChecked);
    const [notation, setNotation] = useState<string>();
    const [isChecked, setIsChecked] = useState<boolean>();
    const [cost, setCost] = useState<number>();
    const [responsePersonList, setResponsePersonList] = useState<Array<string>>();
    const [dueDate, setDueDate] = useState<Date>();

    useEffect(() => {
      setNotation(loggingList[keyorder - 1]?.notation ?? '');
      setIsChecked(loggingList[keyorder - 1]?.status);
      setCost(loggingList[keyorder - 1]?.cost ?? 0);
      setResponsePersonList(loggingList[keyorder - 1]?.responsiblePersonList ?? []);
      setDueDate(loggingList[keyorder - 1]?.dueDate ?? new Date());
    }, [])

    const updateKeyActData = (approve: boolean, disapprove: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!approve && !disapprove) ? undefined : approve;
        }
      })
      setApprove(approve);
      setDisapprove(disapprove);
      setDatalist(keyActList);
    }

    return (
      <View style={[styles.GreenCard]}>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '100%' }}>
          <Text style={[TextStyle.Heading,{fontSize: 18}]}>ความสอดคล้อง : { isChecked ? 'สอดคล้อง':'ไม่สอดคล้อง' }</Text>
          {
            notation
            ? <Text style={[TextStyle.Heading,{fontSize: 18}]}>หมายเหตุ : { notation }</Text>
            : <></>
          }

          {
            !isChecked
            ? (
              <View style={{ backgroundColor: 'white', width: '100%' }}>
                <Text style={[TextStyle.Heading,{fontSize: 18}]}>ผู้รับผิดชอบ : { responsePersonList ? responsePersonList[0] : '' }</Text>
                <Text style={[TextStyle.Heading,{fontSize: 18}]}>งบประมาณ : {cost}</Text>
                <Text style={[TextStyle.Heading,{fontSize: 18}]}>กำหนดวันเสร็จ : { format(new Date(dueDate ?? new Date()), 'dd/MM/yyyy') }</Text>
              </View>
            )
            : <></>
          }
        </View>
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>อนุมัติ</Text>}
            checked={approve}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!approve, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่อนุมัติ</Text>} 
            checked={disapprove}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !disapprove) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>
      </View>
    )
  }

  const ApproveResponseAssessmentContainer = () => {
    const [approve, setApprove] = useState(data?.isChecked === undefined ? false : data?.isChecked);
    const [disapprove, setDisapprove] = useState(data?.isChecked === undefined ? false : !data?.isChecked);
    const [notation, setNotation] = useState<string>();
    const [isConsisted, setIsConsisted] = useState<boolean>();

    useEffect(() => {
      setNotation(loggingList[keyorder - 1]?.notation ?? '');
      setIsConsisted(loggingList[keyorder - 1]?.status);
    }, [])

    const updateKeyActData = (approve: boolean, disapprove: boolean) => {
      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.isChecked = (!approve && !disapprove) ? undefined : approve;
        }
      })
      setApprove(approve);
      setDisapprove(disapprove);
      setDatalist(keyActList);
    }

    return (
      <View style={[styles.GreenCard]}>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '100%' }}>
          <Text style={[TextStyle.Heading,{fontSize: 18}]}>ความสอดคล้อง : { isConsisted ? 'สอดคล้อง':'ไม่สอดคล้อง' }</Text>
          <Text style={[TextStyle.Heading,{fontSize: 18}]}>หมายเหตุ : { notation }</Text>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'transparent', justifyContent: 'center', width: '100%' }}>
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>อนุมัติ</Text>}
            checked={approve}
            checkedColor={'#13AF82'}
            iconType='font-awesome'
            checkedIcon="check-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(!approve, false) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
          <CheckBox
            center
            title={<Text style={[TextStyle.Content, { fontSize: 18, marginLeft: 5 }]}>ไม่อนุมัติ</Text>} 
            checked={disapprove}
            checkedColor={'#FF4F4F'}
            iconType='font-awesome'
            checkedIcon="minus-square"
            uncheckedIcon="square"
            onPress={()=> { updateKeyActData(false, !disapprove) }}
            containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
          />
        </View>
      </View>
    )
  }

  const NotationContainer = () => {
    const [notation, setNotation] = useState(data?.notation);
    const updateKeyActData = (text: string) => {
      setNotation(text);

      let keyActList = datalist;
      keyActList.forEach((x, index) => {
        if (index === (keyorder - 1)) {
          x.notation = text;
        }
      })
      setDatalist(keyActList);
    }

    return Platform.OS == 'ios'?
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={120}
        style={{flex:1}}
      >
          <View style={styles.CommentWrapper}>
            <Text style={styles.TextHeader}>หมายเหตุ</Text>
            <TextInput 
              style={[styles.InputText, {color: 'black', borderColor: '#B9B9B9'}]}
              editable
              multiline
              scrollEnabled
              onChangeText={(text) => updateKeyActData(text)}
              value={notation}
              placeholder="หมายเหตุ"
              numberOfLines={4}
              textAlignVertical='top'
              maxLength={256}
            />
          </View>
      </KeyboardAvoidingView>
    : 
    <View style={styles.CommentWrapper}>
      <Text style={styles.TextHeader}>หมายเหตุ</Text>
      <TextInput 
        style={[styles.InputText, {color: 'black', borderColor: '#B9B9B9'}]}
        editable
        multiline
        scrollEnabled
        onChangeText={(text) => setNotation(text)}
        value={notation}
        placeholder="หมายเหตุ"
        numberOfLines={4}
        textAlignVertical='top'
        maxLength={256}
      />
    </View>
  }

  const getTabLabel = () => {
    switch (index) {
      case 0:
        return 'สาระสำคัญ';
      case 1:
        return 'เกณฑ์ชี้วัด';
      case 2:
        return 'ความถี่';
      case 3:
        return 'แนวทางปฏิบัติ';
      case 4:
        return 'ประวัติการประเมิน';
    }
    return '';
  }

  const getTabIcon = () => {
    switch(index) {
      case 0:
        return <MaterialCommunityIcons name='key-variant' size={20} color={'#6C6C6C'} style={{ marginTop:5, marginHorizontal: 5 }}/>
      case 1:
        return <MaterialCommunityIcons name="information" size={20} color={'#6C6C6C'} style={{ marginTop:5, marginHorizontal: 5 }} />
      case 2:
        return <Ionicons name="time-outline" size={20} color={'#6C6C6C'} style={{ marginTop:5, marginHorizontal: 5 }} />
      case 3:
        return <MaterialIcons name="library-add-check" size={20} color={'#6C6C6C'} style={{ marginTop:5, marginHorizontal: 5 }} />
      case 4:
        return <MaterialCommunityIcons name="circle-slice-5" size={20} color={'#6C6C6C'} style={{ marginTop:5, marginHorizontal: 5 }} />
    }
  }

  const getAssessmentContainer = () => {
    switch(taskProcess) {
      case TaskProcess.Relevant:
        return <AssessmentContainer/>
      case TaskProcess.Consistance:
        return <ConsistanceAssessmentContainer/>
      case TaskProcess.ApproveRelevant:
        return <ApproveRelevantAssessmentContainer/>
      case TaskProcess.ApproveConsistance:
        return <ApproveConsistanceAssessmentContainer/>;
      case TaskProcess.Response:
        return <ResponsibleAssessmentContainer/>;
      case TaskProcess.ApproveResponse:
        return <ApproveResponseAssessmentContainer/>;
    }
  }

  const KeyActContainer = (content: string) => {
    const ScrollViewRef = useRef() as LegacyRef<ScrollView>;
    
    return(
      <ScrollView 
        contentContainerStyle={{ height: 'auto' }}
        ref={ScrollViewRef}
        scrollEventThrottle={400}>
        <View style={[ViewStyle.RowContainer, { paddingVertical: 10, backgroundColor: 'white' }]} >
          { getTabIcon() }

          <View style={[ViewStyle.ColumnContainer, { backgroundColor: 'white' }]}>
            <Text style={[styles.TextHeader, { color: '#6C6C6C' }]}>{ getTabLabel() }</Text>
            <Text style={[TextStyle.Content, { fontSize: 18 }]}>{content}</Text>
          </View>
        </View>

        { getAssessmentContainer() }
        <NotationContainer/>
      </ScrollView>
    )
  }

  const LoggingWrapper = (log: KeyActLoggingModel, index: number) => {
    return (
      <View key={'logging-'+index} style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5 }}>
        <View style={{ backgroundColor: ColorStyle.LightGrey.color, borderRadius: 8, paddingHorizontal: 5 }}>
          <Text style={TextStyle.Content}>{log.employeeName} : {log.taskProcessTitle}</Text>
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={[TextStyle.Content, { fontSize: 10, marginLeft: 5 }]}>{ format(new Date(log.createDate), 'dd/MM/yyyy') }</Text>
          <Text style={[TextStyle.Content, { fontSize: 10, marginLeft: 5, marginTop: -3 }]}>{ format(new Date(log.createDate), 'HH:mm') }</Text>
        </View>
      </View>
    )
  }

  const AssessemntHistoryContainer = (content: Array<KeyActLoggingModel>) => {
    const ScrollViewRef = useRef() as LegacyRef<ScrollView>;
    
    return(
      <ScrollView 
        contentContainerStyle={{ height: 'auto' }}
        ref={ScrollViewRef}
        scrollEventThrottle={400}>
        <View style={[ViewStyle.RowContainer, { paddingVertical: 10, backgroundColor: 'white' }]} >
          { getTabIcon() }

          <View style={[ViewStyle.ColumnContainer, { backgroundColor: 'white' }]}>
            <Text style={[styles.TextHeader, { color: '#6C6C6C' }]}>{ getTabLabel() }</Text>
            <View style={{ flexDirection: 'column', backgroundColor: 'white' }}>
              { content.length > 0
                ? content.map((log, index) => LoggingWrapper(log, index))
                : <Text style={TextStyle.Content}>ไม่มีประวัติการประเมิน</Text>
              }
            </View>
          </View>
        </View>

        { getAssessmentContainer() }
        <NotationContainer/>
      </ScrollView>
    )
  }

  const AssessmentWrapper = () => {
    return (
      <View style={styles.Container}>
        <KeyActButton/>
        <TabContainer/>

        <SafeAreaView style={{ width: '100%' }}>
          <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
            <Pressable style={styles.ButtonSubmit}
              onPress={()=> navigation.navigate('TaskResultContainer', { taskId: taskId, keyactList: datalist, taskProcess: taskProcess })}>
              <Text style={[TextStyle.Heading, { color: 'white', textAlign: 'center' }]}>สรุปแบบประเมิน</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  return (
    <View style={[ViewStyle.RowContainer, { backgroundColor: Colors.light.tint, paddingHorizontal: 0 }]}>
      <View style={[ViewStyle.ColumnContainer, { backgroundColor: Colors.light.tint }]}>
        {/* heading */}
        <Text numberOfLines={2} style={[TextStyle.Heading, { color: 'white', marginLeft: 10 }]}>พ.ร.บ พลังงานนิวเคลียร์</Text>
        <Text style={[TextStyle.Content, styles.TextTotalKeyAct, { marginLeft: 10 }]}>ทั้งหมด {datalist.length} ข้อ</Text>

        <View style={styles.CardContainer}>
          { isLoading ? <LoadingElement/> : <AssessmentWrapper/> }
        </View>
      </View>
    </View>
  );
}

const LoadingElement = () => {
  return (
    <View style={[ViewStyle.LoadingWrapper, { backgroundColor: 'white' }]}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    backgroundColor: 'white'
  },
  CardContainer: {
    flex: 1,
    marginTop: 15,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  TextTotalKeyAct: {
    color: Colors.light.tint,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#E7F7F3'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  },
  ButtonSubmit: {
    backgroundColor: '#13AF82',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 10
  },
  ArrowButton: {
    paddingVertical: 4,
    borderRadius: 7
  },
  ContentWrapper: {
    height:'50%',
    backgroundColor: 'transparent',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:15,
  },
  GreenCard: {
    backgroundColor: '#DEF4EC',
    alignItems:'flex-start',
    justifyContent:'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  GreenCardText: {
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
    color: '#000'
  },
  CommentWrapper:{
    padding: 10,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'white'
  },
  InputText: {
    marginVertical:5, 
    borderWidth: 1,
    borderRadius: 5,
    width:'100%',
    padding: 10,
    fontSize: 15,
    backgroundColor: 'white',
    fontFamily: 'Mitr_400Regular',
  },
  TabViewPage: {
    height: 'auto',
    padding: 10,
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent: 'flex-start',
    width:'100%',
    flex: 1
  },
  AssignWrapper: {
    backgroundColor: ColorStyle.Green.color,
    alignItems:'flex-start',
    justifyContent:'center',
    width: '100%',
    borderRadius: 8,
  },
  DateSelect:{
    width:'100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'transparent'
  },
  ModalContainer: {
    marginTop: Dimensions.get('window').height / 3,
    height: Dimensions.get('window').height - (Dimensions.get('window').height / 3),
    padding: 20,
    borderRadius: 15,
    elevation: 20,
    backgroundColor: 'white'
  },
  KeyboardBT: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8
  },
});
