import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions, TextInput, Appearance, KeyboardAvoidingView, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements';

import { MaterialIcons, Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TaskRAAssessmentList, TaskRelativeAssessment } from '../../constants/Task';
import darkColors from 'react-native-elements/dist/config/colorsDark';

import LawDetail from '../../shared/LawDetail';
import { UserInfo } from '../../constants/UserInfo';

const AppearanceColor = Appearance.getColorScheme()==='dark'? '#fff':'#000'

// ============================= Detail =================================

export function TaskRADetail() {
    const navigation =  useNavigation()
  
    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{ flexGrow:1 }}>
                <LawDetail path="/screens/TaskDetailScreen.tsx"/>
            </ScrollView>
            <Pressable onPress={()=> navigation.navigate('TaskRAAssessment')} style={styles.button}>
                <Text style={[styles.TextHeader, {color:'#fff'}]}>เริ่มทำการประเมิน</Text>
            </Pressable>
        </View>
    );

}



// ============================= Assessment =================================

export function TaskRAAssessment() {
    const navigation =  useNavigation();
    const layout = useWindowDimensions();
    const [datalist, setDatalist] = useState(TaskRelativeAssessment.keyact)
    const [keyorder, setKeyorder] = useState(1)
    const [data, setData] = useState(datalist[(keyorder-1)]);

    const [approvallist, setApprovallist] = useState(TaskRAAssessmentList.approval)
    const [approvaldata, setApprovaldata] = useState(approvallist[(keyorder-1)])
    const [approved, setApproved] = useState(approvaldata.approved? true:false);
    const [disapproved, setDisapprovedd] = useState(approvaldata.approved? false:true)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'สาระสำคัญ' },
      { key: 'second', title: 'เกณฑ์ชี้วัด' },
      { key: 'third', title: 'ความถี่' },
      { key: 'fourth', title: 'แนวทางปฎิบัติ' },
    ]);

    useEffect(() => {
      setData(datalist[(keyorder-1)])
      setApprovaldata(approvallist[(keyorder-1)])
      setApproved(approvaldata.approved? true:false)
      setDisapprovedd(approvaldata.approved? false:true)
    }, [data,keyorder,approvaldata,approved,disapproved])
    
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
            <View style={{backgroundColor:'white',padding:5,borderRadius:5, marginLeft:10,width:'90%'}}>
              <Text style={[styles.GreenCardText,{fontSize:18}]}>  ผลการประเมิน : {data.related==true? 'เกี่ยวข้อง':'ไม่เกี่ยวข้อง'}</Text>  
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
                defaultValue={approvaldata.comment}
                />
              </View>
          </KeyboardAvoidingView>

        </ScrollView> 

        <Pressable onPress={()=> navigation.navigate('TaskRAResult')} style={styles.button}>
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

export function TaskRAResult() {
    const navigation =  useNavigation()
    const [keylist, setKeylist] = useState(TaskRelativeAssessment.keyact)
    const [approvallist, setApprovallist] = useState(TaskRAAssessmentList.approval)

    const ContentElement = keylist.map((content,index) => {
      return(
        <View key={index}>
          <View style={{borderWidth:1, borderColor:'#EEEEEE', margin:10}}/>
          <View style={[styles.RowView, {justifyContent:'space-between'}]}>
            <Text style={[styles.TextContent, {color:getTextcolor((approvallist[index].approved)), width:'70%'}]}>ข้อ {content.order} {content.keyreq}</Text>
            <Text style={styles.TextContent}>{(approvallist[index].approved)? 'อนุมติ':'ไม่อนุมติ'}</Text>
          </View>
          {
            (approvallist[index].comment)===''? <></> : <Text style={{marginTop:5}}>{'\t'}หมายเหตุ : {(approvallist[index].comment)}</Text>
          }
        </View>
        
      )

    })
    
    return (
        <View style={styles.Container}>
          <View style={[styles.GreenCard,{alignItems:'center'}]}>
            <Text style={[styles.TextHeader, {color:'#000'}]}>{TaskRelativeAssessment.title}</Text>
            <View style={styles.RowView}>
              <Feather name="map-pin" size={22} color="#13AF82" style={{marginRight:5}}/>
              <Text style={[styles.TextContent, {color:'#13AF82'}]}>{TaskRelativeAssessment.location}</Text>
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

          <Pressable onPress={()=> navigation.navigate('Task')} style={styles.button}>
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



const styles = StyleSheet.create({
    Container: {
      flex: 1,
      flexGrow:1,
      paddingHorizontal: 5,
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
    // Container: {
    //     flex: 1,
    //     flexGrow:1,
    //     paddingHorizontal: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width:'100%',
    //     paddingTop:10,
    //   },
    //   TextHeader: {
    //     fontSize: 18,
    //     fontFamily: 'Mitr_500Medium'
    //   },
      TextContent: {
        fontSize: 15,
        fontFamily: 'Mitr_400Regular'
      },
    //   button: {
    //     backgroundColor:'#13AF82',
    //     width:'100%',
    //     height:'7%',
    //     borderRadius:20,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     marginVertical:10,
    //   },
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