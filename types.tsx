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

class KeyActModel {
  id: string;
  keyReq: string;
  standard: string;
  practice: string;
  frequency: string;
  order: number;
  lawId: string;
  isRelated?: boolean;
  notation?: string;
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Profile: undefined;
  Task: undefined;
  Tracking: undefined;
  TrackingLocation: undefined;
  TaskLocation: { locationId: string };
  TaskRelevantDetail: { taskId: string };
  TaskRelevantAssessment: { taskId: string };
  TaskRelevantResult: { keyactList: Array<KeyActModel>};
  TaskConsistanceDetail: { taskId: string };
  TaskConsistanceAssessment: { taskId: string };
  TaskConsistanceResult: undefined;
  TaskRADetail: { taskId: string };
  TaskRAAssessment: { taskId: string };
  TaskRAResult: undefined;
  TaskCADetail: { taskId: string };
  TaskCAAssessment: { taskId: string };
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
