import { Feather, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export function TabBarFeatherIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -10 }} {...props} />;
}

export function TabBarSimpleLineIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
}) {
  return <SimpleLineIcons size={28} style={{ marginBottom: -10 }} {...props} />;
}

export function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={32} style={{ marginBottom: -10 }} {...props} />;
}