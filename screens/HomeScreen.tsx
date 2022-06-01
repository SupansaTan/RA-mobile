import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons  } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { HomeListData } from '../constants/Home';
import { HomeContentModel, NotifyContentModel } from '../model/Home';

export default function HomeScreen({ path }: { path: string }) {
  const [itemList, setItemList] = useState(HomeListData)

  const ContentElement = (contentItem: HomeContentModel| NotifyContentModel, i: number) => {
    return(
      <View key={'content' + i}>
        <TouchableOpacity>
          <View style={[styles.ContentContainer]} 
            accessibilityRole='button'>

            {/* title */}
            <View style={styles.ContentWrapper}>
              <Text style={styles.TextHeader}>{ contentItem.title }</Text>
              <Text style={styles.TextContent}>{ contentItem.content }</Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const HomeElementList = (contentData: Array<HomeContentModel | NotifyContentModel>) => {
    return (
      contentData.map((content: HomeContentModel | NotifyContentModel, index: number) => {
        return ContentElement(content, index)
      })
    )
  }

  const HomeDataElement = itemList.map((item, index) => {
    return(
      <View key={index}>
        {/* heading */}
        <View style={styles.HeadingContainer}>
          <Text style={styles.TypeText}>
            { item.type=='due-today' ? 'งานที่กำหนดส่งวันนี้':'แจ้งเตือนล่าสุด' }
          </Text>

          {/* see all */}
          <View style={styles.SeeAllWrapper}>
            <Text style={styles.TypeText}>ทั้งหมด</Text>
            <MaterialIcons name="navigate-next" size={20} color="#323232" style={{ marginTop: 11 }} />
          </View>
        </View>

        {/* content */}
        { HomeElementList(item.data) }
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { HomeDataElement }
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
  TypeText: {
    fontSize: 18,
    marginTop: 10,
    color: '#4A4A4A',
    fontFamily: 'Mitr_500Medium'
  },
  AssignText: {
    fontSize: 14,
    color: '#4a4a4a',
    justifyContent: 'center',
    fontFamily: 'Poppins_500Medium'
  },
  HeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SeeAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ContentContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 4,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  ContentWrapper: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  DatetimeWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  AssignWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
    backgroundColor: 'transparent'
  },
  AssginCard: {
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff66'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold'
  },
  TextContent: {
    fontSize: 14,
    fontFamily: 'Mitr_300Light'
  }
});
