import {StyleSheet, TextInput, View} from "react-native";
import React from "react";

export default function Input({inputConfig, style, right}) {
  return (
    <View style={styles.iputContainer}>
      <TextInput style={[styles.inputText, style]} {...inputConfig} />
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  iputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  inputText: {
    flex: 0.8,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#7b4e80",
  },
});
