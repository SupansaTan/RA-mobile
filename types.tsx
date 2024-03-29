/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyActModel, KeyActApproveModel } from './model/KeyAct.model';
import { TrackingModel } from './model/Tracking.model';

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
  TrackingLocation: { trackinglist: TrackingModel};
  LawDetailContainer: { taskId: string, taskProcess: number }
  TaskDetailContainer: { taskId: string, taskProcess: number }
  TaskLocation: { locationId: string };
  LawSearchDetail: { lawId: string };
  Report: undefined;
  ReportLocation: undefined;
  ReportTaskProgress: undefined;
  ReportTaskDetail: undefined;
  Modal: undefined;
  NotFound: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
  Assessment: { taskId: string, taskProcess: number };
  TaskResultContainer: { taskId: string, keyactList: Array<KeyActModel>, taskProcess: number }
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
