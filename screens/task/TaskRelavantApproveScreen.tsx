import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions, TextInput, Appearance, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements';

import { MaterialIcons, Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TaskRAAssessmentList, TaskRelativeAssessment } from '../../constants/Task';
import { KeyActApproveModel } from '../../model/KeyAct.model';
import { LoggingAssessmentModel, KeyActAssessmentDetail, RelevantAssessmentModel } from '../../model/Logging.model';
import { User } from '../../constants/UserInfo';

import LawDetail from '../../shared/LawDetail';
import { UserInfo } from '../../constants/UserInfo';
import { RootStackScreenProps } from '../../types';
import { environment } from '../../environment';

import { ViewStyle } from '../../style/ViewStyle';
import Colors from '../../constants/Colors';
import { TextStyle } from '../../style/TextStyle';
import { TaskDataModel } from '../../model/Task.model';

const AppearanceColor = Appearance.getColorScheme()==='dark'? '#fff':'#000'

// ============================= Detail =================================

export function TaskRADetail({ navigation, route }: RootStackScreenProps<'TaskRADetail'>) {
    const { taskId } = route.params;
  
    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{ flexGrow:1 }}>
                <LawDetail taskId={taskId}/>
            </ScrollView>
            <Pressable onPress={()=> navigation.navigate('TaskRAAssessment', { taskId: taskId })} style={styles.button}>
                <Text style={[styles.TextHeader, {color:'#fff'}]}>เริ่มทำการประเมิน</Text>
            </Pressable>
        </View>
    );

}



// ============================= Assessment =================================

export function TaskRAAssessment({ navigation, route }: RootStackScreenProps<'TaskRAAssessment'>) {
    const layout = useWindowDimensions();
    const [datalist, setDatalist] = useState<Array<KeyActApproveModel>>([])
    const [keyorder, setKeyorder] = useState(1)
    const [data, setData] = useState(datalist[(keyorder-1)]);
    const { taskId } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [notation, setNotation] = useState('');
    const [assessmentLog, setAssessmentLog] = useState<Array<LoggingAssessmentModel>>([]);

    const [logRelated, setLogRelated] = useState(true);
    const [logNotation, setLogNotaiton] = useState('comment');

    const [approved, setApproved] = useState(false);
    const [disapproved, setDisapprovedd] = useState(false)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'สาระสำคัญ' },
      { key: 'second', title: 'เกณฑ์ชี้วัด' },
      { key: 'third', title: 'ความถี่' },
      { key: 'fourth', title: 'แนวทางปฎิบัติ' },
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
        })
        .catch((error) => {
          console.error(error);
        });
      };

      const getLoggingList = () => {
        setIsLoading(true);
  
        fetch(`${environment.apiRaUrl}/api/KeyAction/GetLoggingAssessment?taskId=${taskId}&process=${1}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((res) => {
          setAssessmentLog(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
      };
  
      getKeyActList();
      getLoggingList();
    }, []);

    useEffect(() => {
      let currentKeyact = datalist[keyorder - 1];
      let currentLog = assessmentLog[keyorder - 1]
      setData(currentKeyact);
      setApproved(currentKeyact?.isApprove ?? false);
      setDisapprovedd((!currentKeyact?.isApprove) ?? false);
      setNotation(currentKeyact?.notation ?? '');
      setLogRelated(currentLog?.status)
      setLogNotaiton(currentLog?.notation ?? '')
    }, [keyorder])
  
    useEffect(() => {
      let keyActList = datalist;
      keyActList.forEach((x) => {
        if (x.order === keyorder) {
          x.isApprove = approved;
        }
      })
      setDatalist(keyActList);
      setData(keyActList[keyorder - 1]);
    }, [approved])
  
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
    
    return ( isLoading? <LoadingElement/> :
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
                first: () => FirstRoute(data?.keyReq ?? ''),
                second: () => SecondRoute(data?.standard),
                third: () => ThirdRoute(data?.frequency),
                fourth: () => FourthRoute(data?.practice),
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
            <View style={{backgroundColor:'white',padding:5,borderRadius:5, marginLeft:10,width:'90%'}}>
              <Text style={[styles.GreenCardText,{fontSize:18}]}>  ผลการประเมิน : {logRelated? 'เกี่ยวข้อง':'ไม่เกี่ยวข้อง'}</Text>  
              { logNotation==''? 
              <></> : <Text style={[styles.GreenCardText,{fontSize:18}]}>  หมายเหตุ : {logNotation}</Text> 
              }
              
            </View>
            
            <View style={{flexDirection:'row',backgroundColor:'transparent', marginTop:10}}>
              <CheckBox 
                center
                title={'อนุมติ'}
                checked={approved}
                checkedColor={'#13AF82'}
                onPress={()=> { setApproved(!approved); setDisapprovedd(false); }}
                containerStyle={{backgroundColor:'transparent'}}
                textStyle={styles.GreenCardText}
              />
              <CheckBox 
                center
                title={'ไม่อนุมติ'}
                checked={disapproved}
                checkedColor={'red'}
                onPress={()=> { setDisapprovedd(!disapproved); setApproved(false); }}
                containerStyle={{backgroundColor:'transparent'}}
                textStyle={styles.GreenCardText}
              />
            </View>
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
                defaultValue={data?.notation}
                />
              </View>
          </KeyboardAvoidingView>

        </ScrollView> 

        <Pressable onPress={()=> navigation.navigate('TaskRAResult', {taskId: taskId, keyactList: datalist})} style={styles.button}>
          <Text style={[styles.TextHeader, {color:'#fff'}]}>สรุปแบบประเมิน</Text>
        </Pressable>
      </View>
    );
    
}


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





// ============================= Result =================================

export function TaskRAResult({ navigation, route }: RootStackScreenProps<'TaskRAResult'>) {
    const { taskId, keyactList } = route.params;
    const [AssessmentList, setAssessmentList] = useState<Array<KeyActAssessmentDetail>>([]); 
    const [ taskData, setTaskData ] = useState<TaskDataModel>();

    useEffect(() => {
      const getTaskData = () => {

        fetch(`${environment.apiRaUrl}/api/Task/GetTaskDataById?taskId=${taskId}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((res) => {
          setTaskData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      };
      getTaskData();
    }, []);

    const SaveAssessment = () => {
      let keyActList = keyactList;
      let element = new KeyActAssessmentDetail();
      keyActList.forEach(x => {
        element.keyActId = x.id;
        element.isRelated = x.isApprove;
        element.notation = x.notation;
        AssessmentList.push(element)
      });
      AddLogging();
    };
  
    const AddLogging = () => {
      let request = new RelevantAssessmentModel();
      request.employeeId = User.emdId;
      request.taskId = taskId;
      request.process = 2;
      request.keyActList = AssessmentList;
  
      fetch(`${environment.apiRaUrl}/api/KeyAction/LoggingAssessment/Add`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      .then((response) => response.json())
      .then((res) => {
        navigation.navigate('Task')
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const ContentElement = keyactList.map((content,index) => {
      return(
        <View key={index}>
          <View style={{borderWidth:1, borderColor:'#EEEEEE', marginVertical:10}}/>
          <View style={[styles.RowView, {justifyContent:'space-between'}]}>
            <Text style={[styles.TextContent, {color:getTextcolor(content.isApprove ?? false), width:'70%'}]}>ข้อ {content.order} {content.keyReq}</Text>
            <Text style={styles.TextContent}>{content.isApprove===true? 'อนุมติ':'ไม่อนุมติ'}</Text>
          </View>
          {
            content.notation? <></> : <Text style={{marginTop:5}}>{'\t'}หมายเหตุ : {content.notation}</Text>
          }
        </View>
      )
    })
    
    return (
        <View style={styles.Container}>
          <View style={[styles.GreenCard,{alignItems:'center'}]}>
            <Text style={[styles.TextHeader, {color:'#000'}]}>{taskData?.taskTitle}</Text>
            <View style={styles.RowView}>
              <Feather name="map-pin" size={22} color="#13AF82" style={{marginRight:5}}/>
              <Text style={[styles.TextContent, {color:'#13AF82'}]}>{taskData?.locationName}</Text>
            </View>
          </View>

          <View style={styles.ContentContainer}>
            <View style={[styles.RowView, {justifyContent:'space-between'}]}>
              <Text style={[styles.TextHeader]}>ประเมินโดย</Text>
              <Text style={[styles.TextContent]}>{UserInfo.Fname} {UserInfo.Lname}</Text>
            </View>
          </View>
          

          <ScrollView contentContainerStyle={{ flexGrow:1 }}>
            <View style={styles.ContentContainer}>
              {ContentElement}
            </View>
          </ScrollView>

          <Pressable onPress={()=> SaveAssessment()} style={styles.button}>
              <Text style={[styles.TextHeader, {color:'#fff'}]}>ส่งอนุมติ</Text>
          </Pressable>
        </View>
    );
}


const getTextcolor = (Assessment:boolean) => {
  return(
    Assessment===true? '#13AF82': '#FF4F4F'
  )
}


const LoadingElement = () => {
  return (
    <View style={ViewStyle.LoadingWrapper}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
}



const styles = StyleSheet.create({
    Container: {
      flex: 1,
      flexGrow:1,
      paddingHorizontal: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    TextHeader: {
      fontSize: 18,
      fontFamily: 'Mitr_500Medium',
    },
    button: {
      backgroundColor:'#13AF82',
      width:'100%',
      height:'7%',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      marginVertical:5,
      marginBottom:20,
    },
      TextContent: {
        fontSize: 15,
        fontFamily: 'Mitr_400Regular'
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
        height:'50%',
        backgroundColor: 'transparent',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:15,
        width:'90%',
      },
      RowView : {
        flexDirection:'row', 
        backgroundColor:'transparent',
      },
      ContentContainer: {
        backgroundColor: 'transparent',
        margin:5,
        width:375,
      },
  });