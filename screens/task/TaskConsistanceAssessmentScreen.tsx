import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions, TextInput, Appearance, KeyboardAvoidingView, Platform, Modal,Keyboard, InputAccessoryView} from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import MultiSelect from 'react-native-multiple-select';

import { MaterialIcons, Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TaskConsistanceAssessment } from '../../constants/Task';
import darkColors from 'react-native-elements/dist/config/colorsDark';

const AppearanceColor = Appearance.getColorScheme()==='dark'? '#fff':'#000'

const FirstRoute = (data:string) => {
  return(
  <View style={styles.TabViewPage} >
    <MaterialCommunityIcons name='script-text-outline' size={20} color={AppearanceColor} style={{marginTop:5, marginHorizontal:10}}/>
    <View>
      <Text style={styles.TextHeader}>สาระสำคัญ</Text>
      <Text>{data}</Text>
    </View>
  </View>
  )
}

const SecondRoute = (data:string) => {
  return(
  <View style={styles.TabViewPage} >
    <Feather name='info' size={20} color={AppearanceColor} style={{marginTop:5, marginHorizontal:10}}/>
    <View>
      <Text style={styles.TextHeader}>เกณฑ์ชี้วัด</Text>
      <Text>{data}</Text>
    </View>
  </View>
  )
}

const ThirdRoute = (data:string) => {
  return(
  <View style={styles.TabViewPage} >
    <AntDesign name='clockcircleo' size={20} color={AppearanceColor} style={{marginTop:5, marginHorizontal:10}}/>
    <View>
      <Text style={styles.TextHeader}>ความถี่</Text>
      <Text>{data}</Text>
    </View>
  </View>
  )
}

const FourthRoute = (data:string) => {
  return(
    <View style={styles.TabViewPage} >
      <FontAwesome5 name='book' size={20} color={AppearanceColor} style={{marginTop:5, marginHorizontal:10}}/>
      <View>
        <Text style={styles.TextHeader}>แนวทางปฎิบัติ</Text>
        <Text >{data}</Text>
      </View>
    </View>
  )
}

const Employeees = [
  { id: 'นาย A', name: 'นาย A' },
  { id: 'นาย B', name: 'นาย B' },
  { id: 'นาย C', name: 'นาย C' },
  { id: 'นาย E', name: 'นาย E' },
  { id: 'นาย F', name: 'นาย F' },
  { id: 'นาย G', name: 'นาย G' },
  { id: 'นาย H', name: 'นาย H' },
  { id: 'นาย I', name: 'นาย I' },
  { id: 'นาย J', name: 'นาย J' },
  { id: 'นาย K', name: 'นาย K' },
];

export function TaskConsistanceAssessmentScreen() {
    const navigation =  useNavigation();
    const layout = useWindowDimensions();
    const [datalist, setDatalist] = useState(TaskConsistanceAssessment.keyact)
    const [keyorder, setKeyorder] = useState(1)
    const [data, setData] = useState(datalist[(keyorder-1)]);
    const [consistance, setConsistance] = useState(data.consistance? true:false);
    const [nonconsistance, setNonconsistance] = useState(data.consistance? false:true)
    const [cost, onChangeCost] = useState<string>('')
    
    const [duedate, setDuedate] = useState(new Date())
    const [assignshow, setAssignshow] = useState(false);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'สาระสำคัญ' },
      { key: 'second', title: 'เกณฑ์ชี้วัด' },
      { key: 'third', title: 'ความถี่' },
      { key: 'fourth', title: 'แนวทางปฎิบัติ' },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);


    const onSelectedItemsChange = (selectedItems:any) => {
      setSelectedItems(selectedItems);
      for (let i = 0; i < selectedItems.length; i++) {
        var tempItem = Employeees.find(item => item.id === selectedItems[i]);
        console.log(tempItem);
      }
    };

    const duedateOnChange = (event:any, selectedDate:any) => {
      const currentDate = selectedDate;
      setDuedate(currentDate);
    };

    useEffect(() => {
      setData(datalist[(keyorder-1)])
      setConsistance(data.consistance? true:false)
      setNonconsistance(data.consistance? false:true)
    }, [data,keyorder,consistance,nonconsistance])
    
    return (
      <View style={styles.Container}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Button
            type="clear"
            icon={<AntDesign name='stepbackward' color={AppearanceColor} size={30}/>}
            buttonStyle={{
              backgroundColor:'transparent'
            }}
            onPress={()=> { setKeyorder(1); setData(datalist[0]); }}
            disabled={keyorder===1? true:false }
          />
          <Button
            type="clear"
            icon={<MaterialIcons name='keyboard-arrow-left' color={AppearanceColor} size={50}/>}
            buttonStyle={{
              backgroundColor:'transparent'
            }}
            onPress={()=> { setKeyorder(keyorder-1); setData(datalist[keyorder-1]); }}
            disabled={keyorder===1? true:false }
          />
          <Text style={[styles.TextHeader,{marginHorizontal:60}]}>ข้อที่ {keyorder}</Text>
          <Button
            type="clear"
            icon={<MaterialIcons name='keyboard-arrow-right' color={AppearanceColor} size={50}/>}
            buttonStyle={{
              backgroundColor:'transparent'
            }}
            onPress={()=> { setKeyorder(keyorder+1); setData(datalist[keyorder-1]); }}
            disabled={keyorder===datalist.length? true:false }
          />
          <Button
            type="clear"
            icon={<AntDesign name='stepforward' color={AppearanceColor} size={30}/>}
            buttonStyle={{
              backgroundColor:'transparent'
            }}
            onPress={()=> { setKeyorder(datalist.length); setData(datalist[datalist.length-1]); } }
            disabled={keyorder===datalist.length? true:false }
          />
        </View>
        
        <ScrollView contentContainerStyle={{flexGrow:1}} scrollEnabled={false}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={
              SceneMap({
                first: () => FirstRoute(data.keyreq),
                second: () => SecondRoute(data.standard),
                third: () => ThirdRoute(data.frequency),
                fourth: () => FourthRoute(data.practice),
              })
            }
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width - 100 }}
            style={{width:390, backgroundColor: 'transparent'}}
            renderTabBar={props => <TabBar {...props} 
              indicatorStyle={{backgroundColor: '#13AF82'}}
              style={{backgroundColor: 'transparent', borderRadius:10}}
              activeColor={'#13AF82'}
              inactiveColor={'#B9B9B9'}
              labelStyle={styles.TextContent}
            />}
          />
          <View style={styles.GreenCard}>
          <Text style={[styles.GreenCardText,{fontSize:18}]}>ความสอดคล้อง</Text>
            <View style={{flexDirection:'row',backgroundColor:'transparent'}}>
              <CheckBox 
                center
                title={'สอดคล้อง'}
                checked={consistance}
                checkedColor={'#13AF82'}
                onPress={()=> { setConsistance(!consistance); setNonconsistance(false); }}
                containerStyle={{backgroundColor:'transparent'}}
                textStyle={styles.GreenCardText}
              />
              <CheckBox 
                center
                title={'ไม่สอดคล้อง'}
                checked={nonconsistance}
                checkedColor={'red'}
                onPress={()=> { setNonconsistance(!nonconsistance); setConsistance(false); }}
                containerStyle={{backgroundColor:'transparent'}}
                textStyle={styles.GreenCardText}
              />
            </View>
            {
            nonconsistance? 
            <View style={styles.AssignWrapper}>
              <Pressable onPress={() => setAssignshow(true)} style={{borderWidth:1, padding:10, borderRadius:10, width:'90%', alignItems:'center'}}>
                <Text style={styles.GreenCardText}>มอบหมายงาน</Text>
              </Pressable>
            </View> : <></>
            }
            
            <Modal
            animationType="slide"
            transparent={true}
            visible={assignshow}
            onRequestClose={() => {setAssignshow(!assignshow)}} >
                
                <View style={styles.ModalContainer}>
                  <Pressable onPress={() => setAssignshow(!assignshow)} >
                    <AntDesign name='left' size={20} color={'black'}/>
                  </Pressable>
                  
                  <View style={[ {marginTop:10, marginBottom:20, backgroundColor:'transparent'}]}>

                      <View style={[styles.AssignWrapper,{flex:1,justifyContent:'flex-start',backgroundColor:'transparent'}]}>
                        <Text style={[styles.TextContent, {marginTop:10}]}>ผู้รับผิดชอบ</Text>
                        <View style={{width:'90%',padding:10, backgroundColor:'transparent'}}>
                          <MultiSelect
                          hideTags
                          items={Employeees}
                          uniqueKey="id"
                          onSelectedItemsChange={onSelectedItemsChange}
                          selectedItems={selectedItems}
                          selectText="Select Items"
                          searchInputPlaceholderText="Search Here..."
                          onChangeInput={(text) => console.log(text)}
                          tagRemoveIconColor="#CCC"
                          tagBorderColor="#CCC"
                          tagTextColor="#CCC"
                          selectedItemTextColor="#CCC"
                          selectedItemIconColor="#CCC"
                          itemTextColor="#000"
                          displayKey="name"
                          searchInputStyle={{ color: '#CCC' }}
                          submitButtonColor="#00BFA5"
                          submitButtonText="Submit"
                          />
                        </View>

                        <Text style={styles.TextContent} >รายชื่อผู้รับผิดชอบ</Text>
                        {
                          selectedItems.map((item,index) => 
                          <View key={index} style={{marginLeft:10,marginVertical:5, backgroundColor:'transparent'}}>
                            <Text>{'\u2022' + ' ' + item}</Text>
                          </View>
                        )}

                        <Text style={[styles.TextContent, {marginTop:10}]}>กำหนดวันเสร็จ</Text>
                        <View style={styles.DateSelect}>
                          <DateTimePicker
                            testID="duedatePicker"
                            value={duedate}
                            mode={'date'}
                            onChange={duedateOnChange}
                            minimumDate={new Date()}
                            style={{width:'35%'}}
                          />
                        </View>
                        <Text style={styles.TextContent}>งบประมาณ</Text>
                        <TextInput 
                          style={[styles.InputText, {color:AppearanceColor, borderColor:AppearanceColor, width:'85%', height:30,marginLeft:10}]}
                          defaultValue={data.assign.cost}
                          onChangeText={onChangeCost}
                          value={cost}
                          keyboardType="numeric"
                          inputAccessoryViewID='Close'
                          />
                          <InputAccessoryView nativeID='Close'>
                            <View style={styles.KeyboardBT}>
                              <Button onPress={()=> Keyboard.dismiss()} title="Close"></Button>
                            </View>
                          </InputAccessoryView>
                      </View>

                    <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                      <Pressable 
                      onPress={() => setAssignshow(!assignshow)} 
                      style={{backgroundColor:'#13AF82', width:'100%', alignItems:'center', justifyContent:'center',borderRadius:20,height:50, }} >
                        <Text style={[styles.TextHeader, {color:'#fff'}]}>บันทึก</Text>
                      </Pressable>
                    </View>
                  </View> 
                </View>
              </Modal>

          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={120}
            style={{flex:1}}
          >
              <View style={styles.CommentWrapper}>
                <Text style={styles.TextHeader}>หมายเหตุ</Text>
                <TextInput 
                style={[styles.InputText, {color:AppearanceColor, borderColor:AppearanceColor, width:370}]}
                multiline={true}
                defaultValue={data.comment}
                />
              </View>
          </KeyboardAvoidingView>

        </ScrollView> 

        <Pressable onPress={()=> navigation.navigate('TaskConsistanceResult')} style={styles.button}>
          <Text style={[styles.TextHeader, {color:'#fff'}]}>สรุปแบบประเมิน</Text>
        </Pressable>
      </View>
    );
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    paddingTop:10,
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
    height:'7%',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
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
    padding:10,
    paddingVertical:20,
    marginHorizontal:10,
    width: 375,
    marginVertical:5,
    borderRadius:10,
  },
  GreenCardText: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular',
    color: '#000'
  },
  CommentWrapper:{
    padding: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  InputText: {
    marginVertical:5,
    borderColor:'black', 
    borderWidth:1, 
    borderRadius:5,
    width:'100%',
    padding:5,
    height:100,
    fontSize: 15,
    fontFamily: 'Mitr_400Regular',
  },
  TabViewPage: {
    height:'50%',
    backgroundColor: 'transparent',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:15,
    width:'90%',
  },
  AssignWrapper: {
    backgroundColor:'transparent',
    alignItems:'flex-start',
    justifyContent:'center',
    width: 375,
    borderRadius:10,
  },
  DateSelect:{
    width:'100%',
    borderRadius: 10,
    padding:10,
    backgroundColor: 'transparent'
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
  KeyboardBT: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8
  },
});
