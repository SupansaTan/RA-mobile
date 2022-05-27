import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { NotifyList } from '../constants/Notification';

export default function NotificationScreen({ path }: { path: string }) {
  const [notifyList, setNotifyList] = useState(NotifyList)

  const ContentElement = (contentItem: {title: string, content: string, time: string}, i: number) => {
    return(
      <View key={'content' + i}>
        <View style={styles.ContentContainer}>
          <View style={{ borderRadius: 50, backgroundColor: '#def4ec', paddingHorizontal: 7, paddingVertical: 5 }}>
            <SimpleLineIcons name="check" size={30} color="#13af82" />
          </View>
          <View style={styles.ContentWrapper}>
            <Text style={styles.TextHeader}>{ contentItem.title }</Text>
            <Text style={styles.TextContext}>{ contentItem.content }</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        {
          notifyList.map((item, index) => {
            return(
              <View key={index}>
                <Text style={styles.DateText}>
                  { item.date }
                </Text>
                { 
                  item.data.map((content, index) => {
                    return ContentElement(content, index)
                  })
                }
              </View>
            )
          })
        }
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
  DateText: {
    fontSize: 16,
    marginTop: 10,
    color: '#4a4a4a',
    fontFamily: 'Mitr_500Medium'
  },
  ContentContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  ContentWrapper: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  },
  TextContext: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  }
});
