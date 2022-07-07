import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign} from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LawList } from '../constants/Law';
import { LawContentModel } from '../model/Law';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  const [keyword, onChangeKeyword] = useState<string>('')
  const [lawdata, setLawdata] = useState(LawList)
  const [modalVisible, setModalVisible] = useState(false)
  const [law, setLaw] = useState('Unknown')
  const [actType, setActType] = useState('Unknown')
  const [legislationType, setLegislationType] = useState('Unknown')
  const [legislationUnit, setLegislationUnit] = useState('Unknown')

  const [announceDate, setAnnounceDate] = useState(new Date())
  const [announceshow, setAnnounceshow] = useState(false);
  const [enforceDate, setEnforceDate] = useState(new Date())
  const [enforceshow, setEnforceshow] = useState(false);
  const [cancelDate, setCancelDate] = useState(new Date())
  const [cancelshow, setCancelshow] = useState(false);

  const AnnounceOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setAnnounceshow(false);
    setAnnounceDate(currentDate);
  };

  const EnforceOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setEnforceshow(false);
    setEnforceDate(currentDate);
  };

  const CancelOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setCancelshow(false);
    setCancelDate(currentDate);
  };

  const LawElement = lawdata.map((content: LawContentModel, index: number)=> {
    return(
        <View key={index} >
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('LawSearch')}>
            <View style={styles.LawWrapper}>
              <Text style={styles.HeaderText}>{content.ActType}</Text>
              <Text style={styles.ContentText}>{content.LegislationType}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  })

  const FilterClear = () => {
    setLaw('Unknown')
    setActType('Unknown')
    setLegislationType('Unknown')
    setLegislationUnit('Unknown')
    setAnnounceDate(new Date())
    setEnforceDate(new Date())
    setCancelDate(new Date())
  }
  
  return (
    <View style={styles.Container}>

      <View>
        <View style={styles.SearchWrapper}>
          {/* search */}
          <View style={styles.InputWrapper } >
            <Feather name='search' style={{marginHorizontal:5}} size={20} color={'#6c6c6c'}  />
            <TextInput
              style={styles.InputText}
              onChangeText={onChangeKeyword}
              value={keyword}
              placeholder='ชื่อกฎหมาย'
            />
          </View>

          {/* filter */}
          <TouchableOpacity activeOpacity={0.5} onPress={() =>setModalVisible(true) }>
            <View style={styles.Filter}>
              <MaterialCommunityIcons name='filter-variant' style={{marginHorizontal:5}} color={'#13AF82'} size={25} />
              <Text style={[styles.ContentText, {color:'#13AF82'}]}>ตัวกรอง</Text>
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

                    <Text style={styles.HeaderText}>ตัวกรอง</Text>

                    <Pressable onPress={() => FilterClear()} >
                      <Text style={[styles.HeaderText, {color:'#13AF82'}]}>ล้าง</Text>
                    </Pressable>

                  </View>
                  
                  <View style={[styles.FilterWrapper, {marginTop:10, marginBottom:20}]}>
                    <ScrollView contentContainerStyle={{ flexGrow:1 }}>

                      <Text style={styles.HeaderText}>ค้นหาจาก</Text>
                      <Picker
                          selectedValue={law}
                          onValueChange={(value, index) => setLaw(value)}
                          mode="dropdown"
                          style={styles.picker}
                      >
                          <Picker.Item label="รายการกฎหมายทั้งหมด" value="Unknown" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="B" value="B" />
                      </Picker>

                      <Text style={styles.HeaderText}>ประเภทกฎหมาย/ข้อกำหนด</Text>
                      <Picker
                          selectedValue={legislationType}
                          onValueChange={(value, index) => setLegislationType(value)}
                          mode="dropdown"
                          style={styles.picker}
                      >
                          <Picker.Item label="เลือกประเภทกฎหมาย/ข้อกำหนด" value="Unknown" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="B" value="B" />
                      </Picker>

                      <Text style={styles.HeaderText}>กระทรวง</Text>
                      <Picker
                          selectedValue={legislationUnit}
                          onValueChange={(value, index) => setLegislationUnit(value)}
                          mode="dropdown"
                          style={styles.picker}
                      >
                          <Picker.Item label="เลือกกระทรวง" value="Unknown" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="B" value="B" />
                      </Picker>

                      <Text style={styles.HeaderText}>พระราชบัญญัติ</Text>
                      <Picker
                          selectedValue={actType}
                          onValueChange={(value, index) => setActType(value)}
                          mode="dropdown"
                          style={styles.picker}
                      >
                          <Picker.Item label="เลือกพระราชบัญญัติ" value="Unknown" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="B" value="B" />
                      </Picker>

                      <Text style={styles.HeaderText}>วันที่ประกาศ</Text>
                      <View>
                        <Pressable onPress={()=>{setAnnounceshow(true)}} style={styles.DateSelect}>
                          <Text>{announceDate.toDateString()}</Text>
                        </Pressable>
                        {announceshow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={announceDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={AnnounceOnChange}
                          />
                        )}
                      </View>

                      <Text style={styles.HeaderText}>วันที่มีผลบังคับใช้</Text>
                      <View>
                        <Pressable onPress={()=>{setEnforceshow(true)}} style={styles.DateSelect}>
                          <Text>{enforceDate.toDateString()}</Text>
                        </Pressable>
                        {enforceshow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={enforceDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={EnforceOnChange}
                          />
                        )}
                      </View>

                      <Text style={styles.HeaderText}>วันที่ยกเลิก</Text>
                      <View>
                        <Pressable onPress={()=>{setCancelshow(true)}} style={styles.DateSelect}>
                          <Text>{cancelDate.toDateString()}</Text>
                        </Pressable>
                        {cancelshow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={cancelDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={CancelOnChange}
                          />
                        )}
                      </View>
                    </ScrollView>
                  </View> 
                  
                </View>

              </Modal>

          </TouchableOpacity>
        </View> 

        <Text style={[styles.ContentText, {margin:5}]}> ผลการค้นหา ( {lawdata.length} ) </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { LawElement}
      </ScrollView>

    </View>
  );

}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 100,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  LawWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    marginLeft:5,
    padding: 10,
    elevation:2,
  },
  HeaderText: {
    fontSize: 17,
    color: '#000000',
    fontFamily: 'Mitr_500Medium',
    marginTop: 5,
  },
  ContentText: {
    fontSize: 15,
    color: '#4a4a4a',
    fontFamily: 'Mitr_500Medium'
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
    width: 250,
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
  picker: {
    marginBottom: 10,
    width: '100%',
    backgroundColor:'lightgray',
    
  },
  FilterWrapper: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:'100%',
    backgroundColor: '#fff',
  },
  DateSelect:{
    width:'100%',
    backgroundColor:'lightgray',
    borderRadius: 2,
    padding: 10,
    marginBottom:10,
  },

});
