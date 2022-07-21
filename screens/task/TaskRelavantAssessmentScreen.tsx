import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions, TextInput, Appearance, KeyboardAvoidingView, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements';

import { MaterialIcons, Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TaskRelativeAssessment } from '../../constants/Task';
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

export default function TaskRelavantAssessmentScreen() {
    const navigation =  useNavigation();
    const layout = useWindowDimensions();
    const [datalist, setDatalist] = useState(TaskRelativeAssessment.keyact)
    const [keyorder, setKeyorder] = useState(1)
    const [data, setData] = useState(datalist[(keyorder-1)]);
    const [related, setRelated] = useState(data.related? true:false);
    const [nonrelated, setNonrelated] = useState(data.related? false:true)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'สาระสำคัญ' },
      { key: 'second', title: 'เกณฑ์ชี้วัด' },
      { key: 'third', title: 'ความถี่' },
      { key: 'fourth', title: 'แนวทางปฎิบัติ' },
    ]);

    useEffect(() => {
      setData(datalist[(keyorder-1)])
      setRelated(data.related? true:false)
      setNonrelated(data.related? false:true)
    }, [data,keyorder,related,nonrelated])
    
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

        <Pressable onPress={()=> navigation.navigate('TaskRelevantResult')} style={styles.button}>
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
});
