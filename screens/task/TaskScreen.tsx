import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

import { RootTabScreenProps } from '../../types';
import { LocationList } from '../../constants/Location';
import { useNavigation } from '@react-navigation/native';

import { ColorStyle } from '../../style/ColorStyle';
import { environment } from '../../environment';
import { User } from '../../constants/UserInfo';
import { LocationContentModel } from '../../model/Location.model';
import { ViewStyle } from '../../style/ViewStyle';
import { TextStyle } from '../../style/TextStyle';

export default function TaskScreen() {
    const [locationList, setLocationList] = useState<Array<LocationContentModel>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation =  useNavigation()

    useEffect(() => {
      const getLocationList = () => {
        setIsLoading(true);
  
        fetch(`${environment.apiRaUrl}/api/Location/GetLocationListByEmpId?empId=${User.emdId}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((res) => {
          setLocationList(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
      };
  
      getLocationList();
    }, []);
  
    const LocationElement = locationList.map((location, index) => {
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
                <Text style={styles.TextHeader}>{ location.locationName }</Text>
                <Text style={[styles.TextContent, ColorStyle.Grey]}>{ location.businessType }</Text>
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

    const LocationScreenWrapper = () => {
      return (
        <View style={styles.Container}>
          <ScrollView contentContainerStyle={{ flexGrow:1 }}>
            { LocationElement }
          </ScrollView>
        </View>
      )
    }
  
  return isLoading ? <LoadingElement/> : <LocationScreenWrapper/>;
}

const LoadingElement = () => (
  <View style={ViewStyle.LoadingWrapper}>
    <ActivityIndicator color={Colors.light.tint} size="large" />
    <Text style={TextStyle.Loading}>Loading</Text>
  </View>
)

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
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
    fontFamily: 'Mitr_500Medium',
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular',
  },
  MoreWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
    backgroundColor: 'transparent'
  },
});
