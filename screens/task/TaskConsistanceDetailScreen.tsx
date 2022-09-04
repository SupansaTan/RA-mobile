import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';

import { Text, View } from '../../components/Themed';
import LawDetail from '../../shared/LawDetail';
import { RootStackScreenProps } from '../../types';

export default function TaskConsistanceDetailScreen({ navigation, route }: RootStackScreenProps<'TaskConsistanceDetail'>) {
  const { taskId } = route.params;

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <LawDetail taskId={taskId}/>
      </ScrollView>
      
      <SafeAreaView style={{ width: '100%' }}>
        <Pressable onPress={()=> navigation.navigate('Assessment', { taskId: taskId, taskProcess: 3 })} style={styles.button}>
          <Text style={[styles.TextHeader, {color:'#fff'}]}>เริ่มทำการประเมิน</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
  },
  button: {
    backgroundColor:'#13AF82',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal: 10
  },
});