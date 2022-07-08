import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import TaskScreen from '../screens/TaskScreen';
import TaskLocationScreen from '../screens/TaskLocationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {TrackScreen, TrackLocationScreen} from '../screens/TrackScreen';
import SearchScreen from '../screens/SearchScreen';
import { ReportScreen, ReportLocationScreen } from '../screens/ReportScreen';
import { LawSearchScreen } from '../screens/LawSearchScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { BottomTabStyle, BottomTabLabelStyle, HeaderTitleStyle } from '../constants/NavigationStyle';
import { TabBarFeatherIcon, TabBarSimpleLineIcon, TabBarMaterialIcon } from './TabBarIcon';

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

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'โปรไฟล์',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="Task" component={TaskScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'งานทั้งหมด',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="TrackingLocation" component={TrackLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'ติดตามสถานะ',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="Tracking" component={TrackScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'ติดตามสถานะ',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="TaskLocation" component={TaskLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'งานทั้งหมด',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="LawSearch" component={LawSearchScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายละเอียดกฎหมาย',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="Report" component={ReportScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
        <Stack.Screen name="ReportLocation" component={ReportLocationScreen} 
        options={{ 
          animation: 'slide_from_right',
          title: 'รายงานสรุปผล',
          headerShadowVisible: false,
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: {backgroundColor: '#f8f8f8'}
        }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
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