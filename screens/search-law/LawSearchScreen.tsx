import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';

import LawDetailOnSearch from '../../shared/LawDetailOnSearch';
import { RootStackScreenProps } from '../../types';

export function LawSearchScreen({ navigation, route }: RootStackScreenProps<'LawSearch'>) {
  const { lawId } = route.params;
  return <LawDetailOnSearch lawId={lawId}/>
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