import {StyleSheet, Text, View} from "react-native";
import React from "react";
import IconButton from "./IconButton";

export default function ButtonsSide({
  iconTopName,
  textIconTop,
  iconBottomName,
  textIconBottom,
  onPressTop,
  onPressBottom,
  iconColor,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconButton
          icon={iconTopName}
          color={"white"}
          size={30}
          style={{
            backgroundColor: "transparent",
          }}
          onPress={onPressTop}
        />
        <Text style={styles.textBase}>{textIconTop} </Text>
      </View>
      <View style={styles.iconWrapper}>
        <IconButton
          icon={iconBottomName}
          color={"white"}
          size={35}
          style={[styles.actionContainer, {backgroundColor: iconColor}]}
          onPress={onPressBottom}
        />
        <Text style={styles.textBase}>{textIconBottom}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    marginVertical: 20,
    height: "100%",
    alignItems: "center",
  },
  actionContainer: {
    backgroundColor: "red",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textBase: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
