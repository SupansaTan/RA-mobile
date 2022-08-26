import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import LawDetail from '../../shared/LawDetail';
import { RootStackScreenProps } from '../../types';


export default function TaskConsistanceDetailScreen({ navigation, route }: RootStackScreenProps<'TaskConsistanceDetail'>) {
  const { taskId } = route.params;

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <LawDetail taskId={taskId}/>
      </ScrollView>
      <Pressable onPress={()=> navigation.navigate('TaskConsistanceAssessment')} style={styles.button}>
        <Text style={[styles.TextHeader, {color:'#fff'}]}>เริ่มทำการประเมิน</Text>
      </Pressable>
    </View>
  );
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
});