/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Search: {
            screens: {
              MenuScreen: 'search',
            },
          },
          Notification: {
            screens: {
              NotificationScreen: 'notification',
            },
          },
          Setting: {
            screens: {
              SettingScreen: 'setting',
            },
          }
        },
      },
      Profile: 'profile',
      Task: 'task',
      TaskLocation: 'tasklocation',
      TaskRelevantDetail: 'taskrelevantdetail',
      TaskRelevantAssessment: 'taskrelevantassessment',
      TaskRelevantResult: 'taskrelevantresult',
      TaskConsistanceDetail: 'taskconsistancedetail',
      TaskConsistanceAssessment: 'taskconsistanceassessment',
      TaskConsistanceResult: 'taskconsistanceresult',
      TaskRADetail: 'taskRAdetail',
      TaskRAAssessment: 'taskRAassessment',
      TaskRAResult: 'taskRAResult',
      TaskCADetail: 'taskCAdetail',
      TaskCAAssessment: 'taskCAassessment',
      TaskCAResult: 'taskCAresult',
      Tracking: 'tracking',
      TrackingLocation: 'trackinglocation',
      LawSearch: 'lawsearch',
      Report: 'report',
      ReportLocation: 'reportlocation',
      ReportTaskProgress: 'reporttaskprogress',
      ReportTaskDetail: 'reporttaskdetail',
      Modal: 'modal',
      SignIn: 'signin',
      ResetPassword: 'resetpassword',
      NotFound: '*',
    },
  },
};

export default linking;
