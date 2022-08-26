/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Profile: undefined;
  Task: undefined;
  Tracking: undefined;
  TrackingLocation: undefined;
  TaskLocation: { locationId: string };
  TaskRelevantDetail: { taskId: string };
  TaskRelevantAssessment: undefined;
  TaskRelevantResult: undefined;
  TaskConsistanceDetail: { taskId: string };
  TaskConsistanceAssessment: undefined;
  TaskConsistanceResult: undefined;
  TaskRADetail: { taskId: string };
  TaskRAAssessment: undefined;
  TaskRAResult: undefined;
  TaskCADetail: { taskId: string };
  TaskCAAssessment: undefined;
  TaskCAResult: undefined;
  LawSearch: undefined;
  Report: undefined;
  ReportLocation: undefined;
  ReportTaskProgress: undefined;
  ReportTaskDetail: undefined;
  Modal: undefined;
  NotFound: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Setting: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
