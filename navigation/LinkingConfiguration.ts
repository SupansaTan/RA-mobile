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
          Task: {
            screens: {
              TaskScreen: 'task',
            },
          },
          Menu: {
            screens: {
              MenuScreen: 'menu',
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
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
