import React, { useState, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Pressable, Platform } from 'react-native';
import { Feather, AntDesign} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { LawList, lawtypeList, ministryList, actList } from '../../constants/Law';
import { LawContentModel } from '../../model/Law';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  const [keyword, onChangeKeyword] = useState<string>('')
  const [lawdata, setLawdata] = useState(LawList)
  const [modalVisible, setModalVisible] = useState(false)

  const [announceDate, setAnnounceDate] = useState(new Date())
  const [announceshow, setAnnounceshow] = useState(false);
  const [enforceDate, setEnforceDate] = useState(new Date())
  const [enforceshow, setEnforceshow] = useState(false);
  const [cancelDate, setCancelDate] = useState(new Date())
  const [cancelshow, setCancelshow] = useState(false);

  const clearPicker = { name: 'Select'}

  const [lawtype, setLawtype] = useState(lawtypeList);
  const [lawtypeselected, setLawtypeSelected] = useState(clearPicker);

  const [ministry, setMinistry] = useState(ministryList);
  const [ministryselected, setMinistrySelected] = useState(clearPicker);
  const [ministryquery, setMinistryQuery] = useState('');

  const [act, setAct] = useState(actList);
  const [actselected, setActSelected] = useState(clearPicker);
  const [actquery, setActQuery] = useState('');


  const filteredMinistry = useMemo(() => {
    if (ministry && ministry.length > 0) {
      return ministry.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(ministryquery.toLocaleLowerCase('en'))
      );
    }
  }, [ministry, ministryquery]);

  const onSearchMinistry = (text:string) => {
    setMinistryQuery(text);
  }

  const filteredAct = useMemo(() => {
    if (act && act.length > 0) {
      return act.filter((item) =>
        item.name
          .includes(actquery.toLocaleLowerCase('th'))
      );
    }
  }, [act, actquery]);

  const onSearchAct = (text:string) => {
    setActQuery(text);
  }

  const AnnounceOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setAnnounceshow(false);
    setAnnounceDate(currentDate);
  };

  const EnforceOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setEnforceDate(currentDate);
    if (Platform.OS === 'android') {
      setEnforceshow(false);
    }
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
    setLawtypeSelected(clearPicker);
    setMinistrySelected(clearPicker);
    setActSelected(clearPicker);
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
              <AntDesign name="filter" size={25} color={'#13AF82'} />
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

                      <Text style={styles.HeaderText}>ประเภทกฎหมาย/ข้อกำหนด</Text>
                      <TouchableOpacity
                        style={styles.picker}
                        onPress={() => {
                          onOpen('actType');
                        }}
                      >
                        <Text>{lawtypeselected.name}</Text>
                      </TouchableOpacity>
                      <Picker
                        id="actType"
                        data={lawtype}
                        label="Select"
                        setSelected={setLawtypeSelected}
                      />

                      <Text style={styles.HeaderText}>กระทรวง</Text>
                      <TouchableOpacity
                        style={styles.picker}
                        onPress={() => {
                          onOpen('ministry');
                        }}
                      >
                        <Text>{ministryselected.name}</Text>
                      </TouchableOpacity>
                      <Picker
                        id="ministry"
                        data={filteredMinistry}
                        label="Select"
                        setSelected={setMinistrySelected}
                        searchable={true}
                        onSearch={onSearchMinistry}
                      />

                      <Text style={styles.HeaderText}>พระราชบัญญัติ</Text>
                      <TouchableOpacity
                        style={styles.picker}
                        onPress={() => {
                          onOpen('act');
                        }}
                      >
                        <Text>{actselected.name}</Text>
                      </TouchableOpacity>
                      <Picker
                        id="act"
                        data={filteredAct}
                        label="Select"
                        setSelected={setActSelected}
                        searchable={true}
                        onSearch={onSearchAct}
                      />

                      <Text style={styles.HeaderText}>วันที่ประกาศ</Text>
                      <View>
                        { !announceshow? 
                          (
                            <Pressable onPress={()=>{setAnnounceshow(true)}} style={styles.DateSelect}>
                              <Text>{announceDate.toDateString()}</Text>
                            </Pressable>
                          ) : 
                          (
                            <Pressable onPress={()=>{setAnnounceshow(false)}} style={styles.Closebutton}>
                              <Text>Close</Text>
                            </Pressable>
                          )}
                          { announceshow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={announceDate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={AnnounceOnChange}
                            style={{ backgroundColor: 'white' }}
                          /> )
                        }
                      </View>

                      <Text style={styles.HeaderText}>วันที่มีผลบังคับใช้</Text>
                      <View>
                        { !enforceshow? 
                        (
                          <Pressable onPress={()=>{setEnforceshow(true)}} style={styles.DateSelect}>
                            <Text>{enforceDate.toDateString()}</Text>
                          </Pressable>
                        ) : 
                        (
                          <Pressable onPress={()=>{setEnforceshow(false)}} style={styles.Closebutton}>
                            <Text>Close</Text>
                          </Pressable>
                        )}
                        { enforceshow && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={enforceDate}
                          mode={'date'}
                          display={Platform.OS === 'ios' ? 'inline' : 'default'}
                          onChange={EnforceOnChange}
                          style={{ backgroundColor: 'white' }}
                        />
                        )}
                      </View>

                      <Text style={styles.HeaderText}>วันที่ยกเลิก</Text>
                      <View>
                        { !cancelshow? 
                          (
                            <Pressable onPress={()=>{setCancelshow(true)}} style={styles.DateSelect}>
                              <Text>{cancelDate.toDateString()}</Text>
                            </Pressable>
                          ) : 
                          (
                            <Pressable onPress={()=>{setCancelshow(false)}} style={styles.Closebutton}>
                              <Text>Close</Text>
                            </Pressable>
                          )}
                          { cancelshow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={cancelDate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={CancelOnChange}
                            style={{ backgroundColor: 'white' }}
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
    width: '75%',
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
  FilterWrapper: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:'100%',
    backgroundColor: '#fff',
  },
  DateSelect:{
    backgroundColor:'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  Closebutton :{
    backgroundColor:'transparent',
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  picker: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 6,
  },

})
