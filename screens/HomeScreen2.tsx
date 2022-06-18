import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LocationList, LocationIcon } from '../constants/Location';
import { LocationContentModel } from '../model/Location';

export default function HomeScreen2({ navigation }: RootTabScreenProps<'Home'>) {
  const [locationList, setNocation] = useState(LocationList)

  const LocationElement = locationList.map((LocationContentModel, index) => {
    return(
      <View key={index} >
        <TouchableOpacity>
          <View style={styles.ContentContainer}>
            {/* icon */}
            <View style={styles.IconWrapper}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color={LocationIcon.iconColor} />
            </View>

            {/* title & content */}
            <View style={styles.ContentWrapper}>
              <Text style={styles.TextHeader}>{ LocationContentModel.location }</Text>
              <Text style={styles.TextContent}>{ LocationContentModel.business }</Text>
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
    paddingTop: 90,
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