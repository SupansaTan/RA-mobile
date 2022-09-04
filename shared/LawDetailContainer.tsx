import React from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import LawDetail from './LawDetail';
import { RootStackScreenProps } from '../types';
import { ViewStyle } from '../style/ViewStyle';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LawDetailContainerScreen({ navigation, route }: RootStackScreenProps<'LawDetailContainer'>) {
  const { taskId, taskProcess } = route.params;
  return (
    <View style={styles.Container}>
      <View style={[ViewStyle.RowContainer, { paddingHorizontal: 0}]}>
        <LawDetail taskId={taskId}/>
      </View>

      <SafeAreaView style={{ width: '100%' }}>
        <Pressable onPress={()=> navigation.navigate('Assessment', { taskId: taskId, taskProcess: taskProcess })} style={styles.button}>
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