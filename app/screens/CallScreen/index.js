import {StyleSheet, View} from "react-native";
import React from "react";
import CallActionBox from "../../component/CallActionBox";

export default function CallScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cameraPreview}></View>
      <CallActionBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7b4e80",
    position: "relative",
  },
  cameraPreview: {
    width: 100,
    height: 150,
    position: "absolute",
    top: 100,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
