import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const TextStyle = StyleSheet.create({
  Heading: {
    fontSize: 20,
    fontFamily: 'Mitr_500Medium',
  },
  HeadingGrey: {
    fontSize: 20,
    color: '#c1c1c1',
    fontFamily: 'Mitr_500Medium',
  },
  Content: {
    fontSize: 15,
    fontFamily: 'Mitr_400Regular'
  },
  Loading: {
    fontSize: 15,
    marginTop: 10,
    color: Colors.light.textSecondary,
    fontFamily: 'Poppins_500Medium'
  }
});