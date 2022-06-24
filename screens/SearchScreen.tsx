import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LawList } from '../constants/Law';
import { LawContentModel } from '../model/Law';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  const [keyword, onChangeKeyword] = useState<string>('')
  const [lawdata, setLawdata] = useState(LawList)

  const LawElement = lawdata.map((content: LawContentModel, index: number)=> {
    return(
        <View key={index} >
            <TouchableOpacity>
            <View style={styles.LawWrapper}>
              <Text style={styles.HeaderText}>{content.ActType}</Text>
              <Text style={styles.ContentText}>{content.LegislationType}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  })
  
  return (
    <View style={styles.Container}>
      {/* <ScrollView contentContainerStyle={{ flexGrow:1 }}> */}

      <View>
        <View style={styles.SearchWrapper}>
          {/* search */}
          <View style={styles.InputWrapper } >
            <Feather name='search' style={{marginHorizontal:5}} size={20} color={'#6c6c6c'}  />
            <TextInput
              style={styles.InputText}
              onChangeText={onChangeKeyword}
              value={keyword}
              placeholder='ชื่อกฎหมาย'
            />
          </View>

          {/* filter */}
          <TouchableOpacity>
            <View style={styles.Filter}>
              <MaterialCommunityIcons name='filter-variant' style={{marginHorizontal:5}} color={'#13AF82'} size={25} />
              <Text style={[styles.ContentText, {color:'#13AF82'}]}>ตัวกรอง</Text>
            </View>
          </TouchableOpacity>
        </View> 

        <Text style={[styles.ContentText, {margin:5}]}> ผลการค้นหา ( {lawdata.length} ) </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { LawElement}
      </ScrollView>

    </View>
  );

}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 100,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  LawWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    marginLeft:5,
    padding: 10,
    elevation:2,
  },
  HeaderText: {
    fontSize: 17,
    color: '#000000',
    fontFamily: 'Mitr_500Medium'
  },
  ContentText: {
    fontSize: 15,
    color: '#4a4a4a',
    fontFamily: 'Mitr_500Medium'
  },
  SearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 50,
  },
  InputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width: 250,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  InputText: {
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
    height: 40,
    width:250,
  },
  Filter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
