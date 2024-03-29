import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Pressable, Platform, ActivityIndicator,Dimensions  } from 'react-native';
import { Feather, AntDesign} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { legislationTypeList } from '../../constants/Law';
import { environment } from '../../environment';
import { LawListModel, LawListDetail, NameData } from '../../model/Law.model';

import { ViewStyle } from '../../style/ViewStyle';
import { TextStyle } from '../../style/TextStyle';
import Colors from '../../constants/Colors';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  const [keyword, onChangeKeyword] = useState<string>('');
  const [lawList, setLawList] = useState<LawListModel>();
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const defaultDate = new Date()

  const [announceDate, setAnnounceDate] = useState(defaultDate)
  const [announceshow, setAnnounceshow] = useState(false);
  const [enforceDate, setEnforceDate] = useState(defaultDate)
  const [enforceshow, setEnforceshow] = useState(false);
  const [cancelDate, setCancelDate] = useState(defaultDate)
  const [cancelshow, setCancelshow] = useState(false);

  const clearPicker = { name: 'Select'}

  const [legislationType, setLegislationType] = useState(legislationTypeList);
  const [legislationTypeSelected, setLegislationTypeSelected] = useState(clearPicker);

  const [ministry, setMinistry] = useState<Array<NameData>>([]);
  const [ministryselected, setMinistrySelected] = useState(clearPicker);
  const [ministryquery, setMinistryQuery] = useState('');

  const [act, setAct] = useState<Array<NameData>>([]);
  const [actselected, setActSelected] = useState(clearPicker);
  const [actquery, setActQuery] = useState('');

  useEffect(() => {
    const getTaskList = () => {
      setIsLoading(true);
      const url = `${environment.apiRaUrl}/api/Law/GetLawList?${getURL()}`

      fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setLawList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getTaskList();
  }, [keyword, legislationTypeSelected, ministryselected, actselected, announceDate, enforceDate, cancelDate]);

  useEffect(() => {
    const GetActTypeName = () => {
      setIsLoading(true);
      const url = `${environment.apiRaUrl}/api/Law/GetActTypeName`

      fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setAct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const GetLegislationUnitName = () => {
      setIsLoading(true);
      const url = `${environment.apiRaUrl}/api/Law/GetLegislationUnitName`

      fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setMinistry(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    GetActTypeName();
    GetLegislationUnitName();
  }, []);


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
    setEnforceshow(false);
    setEnforceDate(currentDate);
  };

  const CancelOnChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setCancelshow(false);
    setCancelDate(currentDate);
  };

  const getURL = () => {
    var url = '';
    if (keyword.length != 0){
      url += `Keyword=${keyword.trim()}`;
    }
    if (legislationTypeSelected.name != clearPicker.name) {
      url += (url.length != 0) ? '&' : ''
      url += `LegislationType=${legislationTypeSelected.name}`;
    }
    if (ministryselected.name != clearPicker.name) {
      url += (url.length != 0) ? '&' : ''
      url += `LegislationUnit=${ministryselected.name}`;
    }
    if (actselected.name != clearPicker.name) {
      url += (url.length != 0) ? '&' : ''
      url += `ActType=${actselected.name}`;
    }
    if (announceDate.toDateString() != defaultDate.toDateString()){
        url += (url.length != 0) ? '&' : ''
        url += `AnnounceDate=${announceDate.toDateString()}&IsFilterByAnnounceDate=true`;
    }
    if (enforceDate.toDateString() != defaultDate.toDateString()){
      url += (url.length != 0) ? '&' : ''
      url += `EnforceDate=${enforceDate.toDateString()}&IsFilterByEnforceDate=true`;
    }
    if (cancelDate.toDateString() != defaultDate.toDateString()){
      url += (url.length != 0) ? '&' : ''
      url += `CancelDate=${cancelDate.toDateString()}&IsFilterByCancelDate=true`;
    } 
    return url;
  }

  const FilterClear = () => {
    setLegislationTypeSelected(clearPicker);
    setMinistrySelected(clearPicker);
    setActSelected(clearPicker);
    setAnnounceDate(defaultDate)
    setEnforceDate(defaultDate)
    setCancelDate(defaultDate)
  }

  const LawElement = lawList?.lawList.map((content: LawListDetail, index: number)=> {
    return( 
        <View key={index} >
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('LawSearchDetail', {lawId: content.lawId })}>
            <View style={styles.LawWrapper}>
              <Text style={styles.HeaderText}>{content.title}</Text>
              <Text style={styles.ContentText}>{content.legislationType}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  })
  
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
              clearButtonMode='always'
            />
          </View>

          {/* filter */}
          <TouchableOpacity activeOpacity={0.5} onPress={() =>setModalVisible(true) }>
            <View style={styles.Filter}>
              <AntDesign name="filter" size={25} color={'#13AF82'} />
              <Text style={[styles.HeaderText, {color:'#13AF82'}]}>ตัวกรอง</Text>
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
                        <Text>{legislationTypeSelected.name}</Text>
                      </TouchableOpacity>
                      <Picker
                        id="actType"
                        data={legislationType}
                        label="Select"
                        setSelected={setLegislationTypeSelected}
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

        <Text style={[styles.ContentText, {margin:5}]}> ผลการค้นหา ( {lawList?.totalLaw} ) </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { isLoading? <LoadingElement/> : LawElement}
      </ScrollView>

    </View>
  );

}

const LoadingElement = () => (
  <View style={ViewStyle.LoadingWrapper}>
    <ActivityIndicator color={Colors.light.tint} size="large" />
    <Text style={TextStyle.Loading}>Loading</Text>
  </View>
)


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 100,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LawWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    marginLeft:5,
    padding: 10,
    elevation:2,
    width: Dimensions.get('window').width-30,
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
    fontFamily: 'Mitr_300Light'
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
