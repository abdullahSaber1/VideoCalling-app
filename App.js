// import { StatusBar } from "expo-status-bar";
import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";

import Navigation from "./app/Navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Navigation />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
