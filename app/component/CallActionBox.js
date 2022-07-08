import {StyleSheet, View} from "react-native";
import React from "react";
import IconButton from "./IconButton";

export default function CallActionBox({onHangupPress}) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isCameraOn, setIsCameraOn] = React.useState(true);
  function onCameraReverse() {}
  function onToggleCamera() {
    setIsCameraOn(!isCameraOn);
  }
  function onToggleMic() {
    setIsMuted(!isMuted);
  }

  return (
    <View style={styles.buttonsContainer}>
      <IconButton
        icon={"camera-flip"}
        color={"white"}
        size={40}
        onPress={onCameraReverse}
      />
      <IconButton
        icon={isCameraOn ? "camera" : "camera-off"}
        color={"white"}
        size={35}
        onPress={onToggleCamera}
      />
      <IconButton
        icon={isMuted ? "microphone-off" : "microphone"}
        color={"white"}
        size={35}
        onPress={onToggleMic}
      />
      <IconButton
        icon={"phone-hangup"}
        color={"white"}
        size={40}
        style={styles.hangupButton}
        onPress={onHangupPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: "#333",
    flex: 0.15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
    marginHorizontal: 5,
  },
  hangupButton: {
    backgroundColor: "red",
  },
});
