import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, useWindowDimensions  } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function TaskResultScreen() {
    const navigation =  useNavigation()
    
    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{ flexGrow:1}}>
                <Text>Task Result</Text>
            </ScrollView>
            <Pressable onPress={()=> navigation.navigate('Task')} style={styles.button}>
                <Text style={[styles.TextHeader, {color:'#fff'}]}>ส่งอนุมติ</Text>
            </Pressable>
        </View>
    );
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
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
  },
});