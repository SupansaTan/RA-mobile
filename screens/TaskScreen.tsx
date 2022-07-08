import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';

import { RootTabScreenProps } from '../types';
import { LocationList } from '../constants/Location';
import { useNavigation } from '@react-navigation/native';

import { ColorStyle } from '../style/ColorStyle';

export default function TaskScreen() {
    const [locationList, setNocation] = useState(LocationList)
    const navigation =  useNavigation()
  
    const LocationElement = locationList.map((LocationContentModel, index) => {
      return(
        <View key={index} >
          <TouchableOpacity onPress={() => navigation.navigate('TaskLocation')}>
            <View style={styles.ContentContainer}>
              {/* icon */}
              <View style={styles.IconWrapper}>
              <Fontisto name="map-marker-alt" size={30} color={ ColorStyle.Grey.color } style={{ marginHorizontal: 10 }} />
              </View>
  
              {/* title & content */}
              <View style={styles.ContentWrapper}>
                <Text style={styles.TextHeader}>{ LocationContentModel.location }</Text>
                <Text style={[styles.TextContent, ColorStyle.Grey]}>{ LocationContentModel.business }</Text>
              </View>
  
              {/* icon */}
              <View style={styles.MoreWrapper}>
                <MaterialIcons name="keyboard-arrow-right" size={30} />
              </View>
            </View> 
          </TouchableOpacity>
        </View>
      )
    })
  
  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { LocationElement }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ContentContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  ContentWrapper: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  IconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  },
  MoreWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
    backgroundColor: 'transparent'
  },
});
