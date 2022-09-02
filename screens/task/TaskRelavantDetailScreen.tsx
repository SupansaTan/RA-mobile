import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import LawDetail from '../../shared/LawDetail';
import { RootStackScreenProps } from '../../types';
import { ViewStyle } from '../../style/ViewStyle';


export default function TaskRelavantDetailScreen({ navigation, route }: RootStackScreenProps<'TaskRelevantDetail'>) {
  const { taskId } = route.params;
  return (
    <View style={styles.Container}>
      <View style={[ViewStyle.RowContainer, { paddingHorizontal: 0}]}>
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
          <LawDetail taskId={taskId}/>
        </ScrollView>
      </View>
      <Pressable onPress={()=> navigation.navigate('Assessment', { taskId: taskId, taskProcess: 1 })} style={styles.button}>
        <Text style={[styles.TextHeader, {color:'#fff'}]}>เริ่มทำการประเมิน</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    marginHorizontal: 10,
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
});