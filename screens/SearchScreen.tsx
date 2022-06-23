import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { UserInfo } from '../constants/UserInfo';
import { MenuList } from '../constants/Menu';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  
  return (
    <View style={styles.Container}>
      <Text> This is Search page </Text>
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
