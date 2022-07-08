import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";

export default function Button({children, onPress, style}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.buttonContainer, style]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: "#7b4e80",
    margin: 16,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
