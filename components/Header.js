import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : '#fff',
    fontSize: 18,
  },
});

export default Header;
