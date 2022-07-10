import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import LawDetail from '../../shared/LawDetail';

export function LawSearchScreen() {
    return(
        <View style={styles.container}>
            <LawDetail path="/screens/LawSearchScreen.tsx"/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });