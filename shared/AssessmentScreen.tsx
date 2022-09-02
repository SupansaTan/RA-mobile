import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions, TextInput, Appearance, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome, FontAwesome5,  Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements';

import { MaterialIcons, Text, View } from '../components/Themed';
import { TaskRelativeAssessment } from '../constants/Task';
import darkColors from 'react-native-elements/dist/config/colorsDark';
import { RootStackScreenProps } from '../types';
import { environment } from '../environment';
import { KeyActModel } from '../model/KeyAct.model';
import { KeyActAssessmentDetail, RelevantAssessmentModel } from '../model/Logging.model';
import { User } from '../constants/UserInfo';
import { ViewStyle } from '../style/ViewStyle';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';
import { TaskProcess } from '../enum/TaskProcess.enum';

export default function TaskRelavantAssessmentScreen({ navigation, route }: RootStackScreenProps<'Assessment'>) {
  const layout = useWindowDimensions();
  const [datalist, setDatalist] = useState<Array<KeyActModel>>([])
  const [keyorder, setKeyorder] = useState(1)
  const [data, setData] = useState(datalist[(keyorder-1)]);
  const [related, setRelated] = useState(false);
  const [nonrelated, setNonrelated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notation, setNotation] = useState('');
  const { taskId, taskProcess } = route.params;
  const [AssessmentList, setAssessmentList] = useState<Array<KeyActAssessmentDetail>>([]); 

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getKeyActList();
  }, []);

  useEffect(() => {
    let currentKeyact = datalist[keyorder - 1];
    setData(currentKeyact);
    setRelated(currentKeyact?.isRelated ?? false);
    setNonrelated((!currentKeyact?.isRelated) ?? false);
    setNotation(currentKeyact?.notation ?? '');
  }, [keyorder])

  useEffect(() => {
    let keyActList = datalist;
    keyActList.forEach((x) => {
      if (x.order === keyorder) {
        x.isRelated = related;
      }
    })
    setDatalist(keyActList);
    setData(keyActList[keyorder - 1]);
  }, [related])

  useEffect(() => {
    let keyActList = datalist;
    keyActList.forEach((x) => {
      if (x.order === keyorder) {
        x.notation = notation;
      }
    })
    setDatalist(keyActList);
    setData(keyActList[keyorder - 1]);
  }, [notation])

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
            '5': () => KeyActContainer('')
          })
        }
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{width: '100%', backgroundColor: 'white', marginTop: 10 }}
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

  const AssessmentContainer = () => {
    return (
      <View style={[styles.GreenCard]}>
        <Text style={[styles.GreenCardText,{fontSize:18}]}>ความเกี่ยวข้อง</Text>
        <View style={{flexDirection:'row',backgroundColor:'transparent', marginTop:10}}>
          <CheckBox 
            center
            title={'เกี่ยวข้อง'}
            checked={related}
            checkedColor={'#13AF82'}
            onPress={()=> { setRelated(!related); setNonrelated(false); }}
            containerStyle={{backgroundColor:'transparent'}}
            textStyle={styles.GreenCardText}
          />
          <CheckBox 
            center
            title={'ไม่เกี่ยวข้อง'} 
            checked={nonrelated}
            checkedColor={'red'}
            onPress={()=> { setNonrelated(!nonrelated); setRelated(false); }}
            containerStyle={{backgroundColor:'transparent'}}
            textStyle={styles.GreenCardText}
          />
        </View>
      </View>
    )
  }

  const NotationContainer = () => {
    return Platform.OS == 'ios'?
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={120}
        style={{flex:1}}
      >
          <View style={styles.CommentWrapper}>
            <Text style={styles.TextHeader}>หมายเหตุ</Text>
            <TextInput 
            style={[styles.InputText, {color: 'white', borderColor: '#B9B9B9', width: '100%'}]}
            multiline={true}
            defaultValue={data?.notation}
            />
          </View>
      </KeyboardAvoidingView>
    : 
    <View style={styles.CommentWrapper}>
      <Text style={styles.TextHeader}>หมายเหตุ</Text>
      <TextInput 
        style={[styles.InputText, {color: 'white', borderColor: '#B9B9B9', width: '100%'}]}
        multiline={true}
        onChangeText={(val) => setNotation(val)}
        defaultValue={notation}
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
    return <></>
  }

  const KeyActContainer = (data: string) => {
    return(
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={[ViewStyle.RowContainer, { paddingVertical: 10, backgroundColor: 'white' }]} >
          { getTabIcon() }

          <View style={[ViewStyle.ColumnContainer, { backgroundColor: 'white' }]}>
            <Text style={styles.TextHeader}>{ getTabLabel() }</Text>
            <Text style={TextStyle.Content}>{data}</Text>
          </View>
        </View>

        <AssessmentContainer/>
        <NotationContainer/>
      </ScrollView>
    )
  }

  const AssessmentWrapper = () => {
    return (
      <View style={styles.Container}>
        <KeyActButton/>
        <TabContainer/>
        <Pressable onPress={()=> navigation.navigate('TaskRelevantResult', { taskId: taskId, keyactList: datalist })} style={styles.button}>
          <Text style={[styles.TextHeader, {color:'#fff'}]}>สรุปแบบประเมิน</Text>
        </Pressable>
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
  button: {
    backgroundColor:'#13AF82',
    width:'90%',
    height:'7%',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    marginHorizontal:50,
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
    padding: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1
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
    height: 'auto',
    padding: 10,
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent: 'flex-start',
    // marginTop: 15,
    width:'100%',
    flex: 1
  },
});
