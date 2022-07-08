import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ContactInfo({ name, phone, status }) {
  return (
    <View style={styles.contactContainer}>
      <Text style={styles.contactName}>{name} </Text>
      <Text style={styles.contactNumber}>
        {status} {phone}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contactContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  contactName: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactNumber: {
    fontSize: 14,
    color: "white",
  },
});
