import { Platform } from 'react-native';

export const BottomTabStyle = {
  height: Platform.OS == 'ios' ? 85:75,
  borderTopLeftRadius: 25, 
  borderTopRightRadius: 25,
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.25,
  shadowRadius: 16.0,
  elevation: 10,
  paddingTop: 10,
  paddingBottom: Platform.OS == 'ios' ? 20:10
}

export const BottomTabLabelStyle = {
  fontSize: 13,
  paddingTop: 10,
  fontFamily: 'mitr'
}

export const HeaderTitleStyle = {
  fontFamily: 'mitr',
  fontSize: 25
}
