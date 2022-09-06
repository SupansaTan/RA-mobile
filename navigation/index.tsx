import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Appearance } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/setting/SettingScreen';
import TaskScreen from '../screens/task/TaskScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import ProfileScreen from '../screens/setting/ProfileScreen';
import SearchScreen from '../screens/search-law/SearchScreen';
import { TrackScreen, TrackLocationScreen}  from '../screens/TrackScreen';
import { ReportScreen, ReportLocationScreen } from '../screens/report/ReportScreen';
import { ReportTaskProgressScreen } from '../screens/report/TaskProgressScreen';
import { ReportTaskDetailScreen } from '../screens/report/TaskDetailScreen';
import { LawSearchDetailScreen } from '../screens/search-law/LawSearchDetailScreen';
import TaskLocationScreen from '../screens/task/TaskLocationScreen';
import TaskConsistanceAssessmentScreen from '../screens/task/TaskConsistanceAssessmentScreen';
import TaskConsistanceResultScreen from '../screens/task/TaskConsistanceResultScreen';
import { TaskRADetail, TaskRAAssessment, TaskRAResult } from '../screens/task/TaskRelavantApproveScreen';
import { TaskCADetail, TaskCAAssessment, TaskCAResult } from '../screens/task/TaskConsistanceApproveScreen';
import SignInScreen from '../screens/sign-in/SignIn';
import ResetPasswordScreen from '../screens/sign-in/ResetPassword';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { BottomTabStyle, BottomTabLabelStyle, HeaderTitleStyle } from '../constants/NavigationStyle';
import { TabBarFeatherIcon, TabBarSimpleLineIcon, TabBarMaterialIcon } from './TabBarIcon';
import { useNavigation } from '@react-navigation/native';
import AssessmentScreen from '../shared/AssessmentScreen';
import LawDetailContainerScreen from '../shared/LawDetailContainer';
import TaskDetailContainerScreen from '../shared/TaskDetailContainer';
import TaskResultContainerScreen from '../shared/TaskResultContainer';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HeaderColor = Appearance.getColorScheme()==='dark'? '#000':'#f8f8f8'

function RootNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'โปรไฟล์',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="Task" component={TaskScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'งานทั้งหมด',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="TrackingLocation" component={TrackLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'ติดตามสถานะ',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="Tracking" component={TrackScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'ติดตามสถานะ',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="TaskLocation" component={TaskLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'งานทั้งหมด',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="LawSearchDetail" component={LawSearchDetailScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายละเอียดกฎหมาย',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="Report" component={ReportScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="ReportLocation" component={ReportLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="ReportTaskProgress" component={ReportTaskProgressScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="ReportTaskDetail" component={ReportTaskDetailScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="TaskDetailContainer" component={TaskDetailContainerScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายละเอียดงาน',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="LawDetailContainer" component={LawDetailContainerScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายละเอียดกฎหมาย',
          headerShadowVisible: false,
          headerTitleStyle: [HeaderTitleStyle, { color: 'white' }],
          headerStyle: {backgroundColor: Colors.light.tint },
          headerTintColor: 'white',
          headerLeft: () => <FontAwesome name="angle-left" size={40} color="white" onPress={() => navigation.goBack()} />,
        }} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: [HeaderTitleStyle, { color: 'white' }],
          headerStyle: {backgroundColor: Colors.light.tint },
          headerTintColor: 'white',
          headerLeft: () => <FontAwesome name="angle-left" size={40} color="white" onPress={() => navigation.goBack()} />,
          headerRight: () => <Feather name="x" size={34} color="white" onPress={() => navigation.navigate('Task')} />
        }} />
         <Stack.Screen name="TaskResultContainer" component={TaskResultContainerScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'สรุปแบบประเมิน',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor},
          headerLeft: () => <FontAwesome name="angle-left" size={40} color="black" onPress={() => navigation.goBack()} />,
          headerRight: () => <Feather name="x" size={34} color="black" onPress={() => navigation.navigate('Task')} />
        }} />
        <Stack.Screen name="TaskConsistanceAssessment" component={TaskConsistanceAssessmentScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
        <Stack.Screen name="TaskConsistanceResult" component={TaskConsistanceResultScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'สรุปแบบประเมิน',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="TaskRAAssessment" component={TaskRAAssessment} 
        options={{ 
          animation: 'slide_from_right',
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />

      <Stack.Screen name="TaskRAResult" component={TaskRAResult} 
        options={{ 
          animation: 'slide_from_right',
          title: 'สรุปแบบประเมิน',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />
      <Stack.Screen name="TaskCAAssessment" component={TaskCAAssessment} 
        options={{ 
          animation: 'slide_from_right',
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />

      <Stack.Screen name="TaskCAResult" component={TaskCAResult} 
        options={{ 
          animation: 'slide_from_right',
          title: 'สรุปแบบประเมิน',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: HeaderColor}
        }} />


      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} 
        options={{ 
          title: 'เข้าสู่ระบบ',
        }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} 
        options={{ 
          title: 'ตั้งรหัสผ่านใหม่',
        }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: BottomTabStyle,
        tabBarLabelStyle: BottomTabLabelStyle,
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'หน้าหลัก',
          headerTitleStyle: HeaderTitleStyle,
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarFeatherIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'ค้นหากฎหมาย',
          headerTitleStyle: HeaderTitleStyle,
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarFeatherIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'แจ้งเตือน',
          headerTitleStyle: HeaderTitleStyle,
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="bell-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: 'ตั้งค่า',
          headerTitleStyle: HeaderTitleStyle,
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarFeatherIcon name="settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}