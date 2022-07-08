import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

import Ioicons from "react-native-vector-icons/Ionicons";

function SearchScreen({value, onSearch}) {
  return (
    <View style={styles.container}>
      <Ioicons name="search" color={"gray"} size={24} />
      <TextInput
        value={value}
        style={styles.textInput}
        placeholder="search"
        placeholderTextColor={"gray"}
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "black",
  },
});

export default SearchScreen;
