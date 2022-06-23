import React, { useState } from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Text, View, MaterialIcons } from '../components/Themed';
import { UserInfo } from '../constants/UserInfo';

export default function ReportScreen() {

    return (
        <View style={styles.Container}>
          <Text> This is Report page </Text>
        </View>
      );

}
    
    
const styles = StyleSheet.create({
    Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    },

});