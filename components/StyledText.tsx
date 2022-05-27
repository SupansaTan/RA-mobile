import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function PoppinsText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins' }]} />;
}

export function MitrText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'mitr' }]} />;
}
