import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TaskRelativeAssessment } from '../../constants/Task';
import { UserInfo } from '../../constants/UserInfo';

export default function TaskRelavantResultScreen() {
    const navigation =  useNavigation()
    const [datalist, setDatalist] = useState(TaskRelativeAssessment.keyact)

    const ContentElement = datalist.map((content,index) => {
      return(
        <View key={index}>
          <View style={{borderWidth:1, borderColor:'#EEEEEE', marginVertical:10}}/>
          <View style={[styles.RowView, {justifyContent:'space-between'}]}>
            <Text style={[styles.TextContent, {color:getTextcolor(content.related), width:'70%'}]}>ข้อ {content.order} {content.keyreq}</Text>
            <Text style={styles.TextContent}>{content.related===true? 'เกี่ยวข้อง':'ไม่เกี่ยวข้อง'}</Text>
          </View>
          {
            content.comment===''? <></> : <Text style={{marginTop:5}}>{'\t'}หมายเหตุ : {content.comment}</Text>
          }
        </View>
        
      )

    })
    
    return (
        <View style={styles.Container}>
          <View style={styles.GreenCard}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentContainer: {
    backgroundColor: 'transparent',
    margin:5,
    marginLeft:10,
    width:375,
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
    marginVertical:5,
    marginBottom:20,
  },
  GreenCard: {
    backgroundColor: '#DEF4EC',
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    marginHorizontal:10,
    width: 375,
    marginVertical:5,
    borderRadius:10,
  },
  RowView : {
    flexDirection:'row', 
    backgroundColor:'transparent',
  },
});