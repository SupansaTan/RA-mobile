import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import { NotifyContentModel, NotificationListDataModel } from '../../model/Notification.model';
import { NotifyList, getIconBgColor, getIconColor } from '../../constants/Notification';
import { environment } from '../../environment';
import { User } from '../../constants/UserInfo';
import { ViewStyle } from '../../style/ViewStyle';
import { TextStyle } from '../../style/TextStyle';

import { format } from 'date-fns'

export default function NotificationScreen({ path }: { path: string }) {
  const [notifyList, setNotifyList] = useState<Array<NotificationListDataModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
  
    const getNotificationList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Notification/GetNotificationByEmpId?empId=${User.emdId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setNotifyList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getNotificationList();
  }, []);

  const ContentElement = (contentItem: NotifyContentModel, index: number) => {
    return(
      <View key={'content' + index}>
        <TouchableOpacity>
          <View style={styles.ContentContainer}>
            {/* icon */}
            <View style={styles.IconWrapper}>
              <View style={{ borderRadius: 60, backgroundColor: getIconBgColor(contentItem.type), padding: 8 }}>
                {
                  (contentItem.type == 'relevant' || contentItem.type == 'consistance')
                  ? <MaterialCommunityIcons name="text-box-search-outline" size={32} color={getIconColor(contentItem.type)} />
                  : <SimpleLineIcons name="check" size={32} color={getIconColor(contentItem.type)} />
                }
              </View>
              { !contentItem.readStatus && <View style={styles.NotityBadge}></View> }
            </View>

            {/* title & content */}
            <View style={styles.ContentWrapper}>
              <Text style={styles.TextHeader}>{ contentItem.title }</Text>
              <Text style={styles.TextContent}>{ contentItem.content }</Text>
            </View>

            {/* time */}
            <View style={styles.TimeWrapper}>
              <Text style={styles.TimeText}>{ contentItem.time }</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const ContentElementList = (contentData: Array<NotifyContentModel>) => {
    return (
      contentData.map((content: NotifyContentModel, index: number) => {
        return ContentElement(content, index)
      })
    )
  }

  const NotifyElement = notifyList.map((content: NotificationListDataModel, index: number) => {
    return(
      <View key={index}>
        {/* date */}
        <Text style={styles.DateText}>
          { content.date }
          {/* { format(new Date(content.date), 'dd/MM/yyyy HH:mm') } */}
        </Text>

        {/* content */}
        {/* { ContentElementList(content.data) } */}
      </View>
    )
  })

  const NotificationContainer = () => {
    return(
      <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        { NotifyElement }
      </ScrollView>
    </View>
    )
  }

  return isLoading? <LoadingElement/> : NotificationContainer
}

const LoadingElement = () => {
  return (
    <View style={ViewStyle.LoadingWrapper}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
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
  TimeText: {
    fontSize: 15,
    color: '#6c6c6c',
    marginTop: 4,
    justifyContent: 'flex-end',
    fontFamily: 'Mitr_400Regular'
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
  TimeWrapper: {
    marginLeft: 'auto',
    marginRight: 2,
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
    color: '#000',
  },
  TextContent: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular',
    color: '#000',
  },
  NotityBadge: {
    width: 10,
    height: 10,
    backgroundColor: '#ff4f4f',
    position: 'absolute',
    top: 5,
    right: 2,
    borderRadius: 10/2
  }
});
