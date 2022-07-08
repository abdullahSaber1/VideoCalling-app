import {ImageBackground, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import ContactInfo from "../../component/ContactInfo";
import ButtonsSide from "../../component/ButtonsSide";
import {Voximplant} from "react-native-voximplant";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function Incoming() {
  const route = useRoute();
  const {call} = route.params;

  const [caller, setCaller] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate("Contacts");
    });

    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, [navigation, call]);

  function onDecline() {
    call.decline();
  }

  function onAccept() {
    navigation.navigate("Calling", {
      user: call.getEndpoints()[0],
      call,
      isIncoming: true,
    });
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/ios_bg.png")}
      style={styles.container}>
      <View style={styles.contactInfoContainer}>
        <ContactInfo name={caller} status={"WhatsApp Video.."} />
      </View>

      <View style={styles.row}>
        <ButtonsSide
          iconTopName={"alarm"}
          textIconTop={"Reminder Me"}
          iconBottomName="close"
          textIconBottom={"Decline"}
          iconColor={"red"}
          onPressBottom={onDecline}
        />

        <ButtonsSide
          iconTopName={"message"}
          textIconTop={"Messages"}
          iconBottomName="check"
          textIconBottom={"Accept"}
          iconColor={"#2e7bff"}
          onPressBottom={onAccept}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contactInfoContainer: {
    flex: 1,
    marginTop: 70,
  },
  container: {
    flex: 1,
  },
  row: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
    alignItems: "center",
    padding: 50,
  },
});
