import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Header from './app/Header';

const App = () => {
  return (
    <SafeAreaView style={Styles.header}>
      <Header />
      <Text style={Styles.text}>Hello Wold</Text>
    </SafeAreaView>
  );
};

const Styles = {
  text: {
    fontSize: 20,
    color: '#000',
  },
};

export default App;
