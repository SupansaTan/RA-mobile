import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { MenuList } from '../constants/Menu';
import RelevantIcon from '../assets/images/relevant.svg';
import ConsistanceIcon from '../assets/images/consistance.svg';
import SearchLegalIcon from '../assets/images/search-legal.svg';
import TrackingIcon from '../assets/images/tracking.svg';

export default function MenuScreen() {

  const getMenuIcon = (name: string) => {
    switch(name) {
      case 'relevant':
        return <RelevantIcon style={{ marginLeft: -8, marginBottom: -25 }} width={80} height={110} />
      case 'consistance':
        return <ConsistanceIcon style={{ marginRight: -3, marginBottom: 5 }} width={80} height={80} />
      case 'search':
        return <SearchLegalIcon width={70} height={80} />
      case 'tracking':
        return <TrackingIcon style={{ marginLeft: 10, marginBottom: 26 }} width={90} height={80} />
    }
  }

  const MenuListElement = MenuList.map((item, index) => {
    return (
      <View style={styles.MenuContainer} key={index}>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.MenuWrapper}>
            { getMenuIcon(item.name) }
            <Text style={styles.MenuText}>{ item.title }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  })

  return (
    <View style={styles.Container}>
      { MenuListElement }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow:1,
    paddingTop: 90,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  MenuContainer: {
    flexBasis: '50%'
  },
  MenuWrapper: {
    margin: 5,
    paddingBottom: 10,
    paddingTop: 30,
    elevation: 9,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  MenuText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Mitr_500Medium'
  }
});
