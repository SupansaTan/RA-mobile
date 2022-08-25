import { StyleSheet } from 'react-native';

export const ViewStyle = StyleSheet.create({
  RowContainer: {
    flex: 1,
    flexGrow:1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ColumnContainer: {
    flex: 1,
    flexGrow:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  IconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  LoadingWrapper: {
    flex: 1,
    flexGrow:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});