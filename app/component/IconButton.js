import {Pressable, StyleSheet, View} from "react-native";
import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function IconButton({color, size, icon, style, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.iconContainer, style]}>
        <MaterialIcons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#4a4a4a",
    padding: 15,
    borderRadius: 50,
  },
  pressed: {
    opacity: 0.75,
  },
});
