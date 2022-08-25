import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Appearance, Platform, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns'

import { Text, View, MaterialIcons } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { MenuList } from '../constants/Home';
import { IncomingTask } from '../constants/Task';
import { TaskContentModel } from '../model/Task';
import { ViewStyle } from '../style/ViewStyle';
import { environment } from '../environment';
import { User } from '../constants/UserInfo';
import Colors from '../constants/Colors';
import { TextStyle } from '../style/TextStyle';

import TrackingIcon from '../assets/images/tracking.svg';

import { CardStyle } from '../style/CardStyle';
import { TaskDatetimeStatus } from '../enum/TaskDatetimeStatus.enum';
import { ColorStyle } from '../style/ColorStyle';
import { TaskDetailModel } from '../model/Task.model';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [username, setUsername] = useState<string>('');
  const [taskList, setTaskList] = useState<Array<TaskDetailModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserInfo = () => {
      fetch(`${environment.apiRaUrl}/api/Employee/GetEmployeeProfile?empId=${User.emdId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setUsername(res.data.firstName);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const getTaskList = () => {
      setIsLoading(true);

      fetch(`${environment.apiRaUrl}/api/Task/GetTaskListByEmpId?empId=${User.emdId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((res) => {
        setTaskList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    getUserInfo();
    getTaskList();
  }, []);

  
  const getMenuIcon = (name: string) => {
    switch(name) {
      case 'Task':
        return  <Ionicons name='clipboard-outline' style={styles.IconWrapper} size={50} color={'#13AF82'}/>
      case 'Report':
        return  <Ionicons name='book-outline' style={styles.IconWrapper} size={50} color={'#13AF82'}/>
      case 'Tracking':
        return <TrackingIcon style={{  marginVertical: -20 }} width={60} height={90} />
    }
  }

  const MenuListElement = MenuList.map((item, index) => {
    return (
      <View style={{flexBasis: '50%'}} key={index}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(item.name)}>
          <View style={styles.MenuWrapper}>
            { getMenuIcon(item.name) }
            <Text style={styles.MenuText}>{ item.title }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  })

  const TaskElement = (contentItem: TaskDetailModel, i: number) => {
    return(
      <View key={'content' + i}>
        <TouchableOpacity >
          <View style={ getCardColorClass(contentItem.datetimeStatus) }>
            <Text style={styles.TextHeader} numberOfLines={2}>{ contentItem.taskTitle }</Text>
            <Text style={[styles.TextContent, {color: '#6C6C6C'}]}>{ contentItem.locationName }</Text>

            <View style={styles.DatetimeWrapper}>
              <MaterialCommunityIcons name="calendar-clock" size={20}
                color={ getTextColor(contentItem.datetimeStatus) } 
                style={{ marginRight: 5 }} />
              <Text style={[styles.TextContent, 
                { color: getTextColor(contentItem.datetimeStatus) }]}>
                { format(new Date(contentItem.dueDate), 'dd/MM/yyyy') }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const TaskElementList = taskList.map((content: TaskDetailModel, index: number) => {
    return TaskElement(content, index)
  })

  return (
    <View style={styles.Container}>
      <View style={ViewStyle.ColumnContainer}>
        <View style={styles.ContentContainer}>
          <Text style={[styles.TextHeader, {color: '#6C6C6C', marginTop: 10,}]}> สวัสดี {username}</Text>

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Task')}>
            <View style={styles.MenuWrapper}>
              { getMenuIcon('Task') }
              <Text style={styles.MenuText}> งานทั้งหมด</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.MenuContainer} >
            { MenuListElement }
          </View>
        </View>

        <Text style={[styles.TextHeader,{color:AppearanceColor, marginBottom: isLoading? 20:0}]}>ใกล้ถึงกำหนด</Text>
        <View style={[ViewStyle.RowContainer, { paddingHorizontal: 0 }]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            { isLoading ? <LoadingElement/> : TaskElementList }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const getCardColorClass = (status: TaskDatetimeStatus) => {
  switch(status) {
    case TaskDatetimeStatus.Overdue:
      return CardStyle.Danger;
    case TaskDatetimeStatus.Today:
      return CardStyle.Warning;
    case TaskDatetimeStatus.Remain:
      return CardStyle.Grey;
  }
}

const getTextColor = (status: TaskDatetimeStatus) => {
  switch(status) {
    case TaskDatetimeStatus.Overdue:
      return ColorStyle.Danger.color;
    case TaskDatetimeStatus.Today:
      return ColorStyle.Warning.color;
    case TaskDatetimeStatus.Remain:
      return ColorStyle.Grey.color;
  }
}

const LoadingElement = () => {
  return (
    <View style={ViewStyle.LoadingWrapper}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
      <Text style={TextStyle.Loading}>Loading</Text>
    </View>
  )
}

const AppearanceColor = Appearance.getColorScheme()==='dark'? '#fff':'#000'

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: Platform.OS == 'ios'? 80:60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ContentContainer: {
    marginVertical: 5,
    borderRadius: 10
  },
  IconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight:10,
  },
  TextHeader: {
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  TextContent: {
    fontSize: 16,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  MenuContainer: {
    flexDirection: 'row',
  },
  MenuWrapper: {
    margin: 5,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor:'#C1C1C1',
  },
  MenuText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Mitr_500Medium',
    color: '#000',
  },
  DatetimeWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },

});
