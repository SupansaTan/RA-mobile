import { StyleSheet } from 'react-native';

export const CardStyle = StyleSheet.create({
  Danger: {
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#FF4F4F',
    backgroundColor: 'white',
    marginHorizontal: 4,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  Warning: {
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ffc107',
    backgroundColor: 'white',
    marginHorizontal: 4,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  Grey: {
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#c1c1c1',
    backgroundColor: 'white',
    marginHorizontal: 4,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
});