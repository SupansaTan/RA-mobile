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
import { RootStackScreenProps } from '../../types';
import { environment } from '../../environment';
import { KeyActModel } from '../../model/KeyAct.model';

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

export default function TaskRelavantAssessmentScreen({ navigation, route }: RootStackScreenProps<'TaskRelevantAssessment'>) {
    const layout = useWindowDimensions();
    const [datalist, setDatalist] = useState<Array<KeyActModel>>([])
    const [keyorder, setKeyorder] = useState(1)
    const [data, setData] = useState(datalist[(keyorder-1)]);
    const [related, setRelated] = useState(false);
    const [nonrelated, setNonrelated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notation, setNotation] = useState('');
    const { taskId } = route.params;

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
      setRelated(currentKeyact.isRelated ?? false);
      setNonrelated((!currentKeyact.isRelated) ?? false);
      setNotation(currentKeyact.notation ?? '');
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
              style={{backgroundColor: 'transparent'}}
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

          { Platform.OS == 'ios'?
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
            : 
            <View style={styles.CommentWrapper}>
              <Text style={styles.TextHeader}>หมายเหตุ</Text>
              <TextInput 
              style={[styles.InputText, {color:AppearanceColor, borderColor:AppearanceColor, width:370}]}
              multiline={true}
              onChangeText={(val) => setNotation(val)}
              defaultValue={notation}
              />
            </View>
          }
          

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
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
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
