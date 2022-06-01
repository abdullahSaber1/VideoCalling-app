import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={Styles.header}>
      <Text style={Styles.text}>Header</Text>
    </SafeAreaView>
  );
};

const Styles = {
  header: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    height: 80,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
};

export default Header;
