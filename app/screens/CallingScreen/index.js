import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, {useEffect, useState, useRef} from "react";
import ContactInfo from "../../component/ContactInfo";
import CallActionBox from "../../component/CallActionBox";
import Ioicons from "react-native-vector-icons/Ionicons";
import {Voximplant} from "react-native-voximplant";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function Calling() {
  const navigation = useNavigation();
  const route = useRoute();
  const voximplant = Voximplant.getInstance();
  const permissions = [
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ];

  const {user, call: inComing, isIncoming} = route.params;

  const call = useRef(inComing);
  const endpoint = useRef(null);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callState, setCallState] = useState("initializing...");

  const [localVideoStreamId, setLocalVideoStreamId] = useState("");
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState("");

  async function requestPermissions() {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted["android.permission.RECORD_AUDIO"] === "granted";
    const cameraGranted = granted["android.permission.CAMERA"] === "granted";
    if (!cameraGranted || !recordAudioGranted) {
      Alert.alert("Permissions not granted");
    } else {
      setPermissionGranted(true);
    }
  }

  useEffect(() => {
    if (Platform.OS === "android") {
      requestPermissions();
    } else {
      setPermissionGranted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      console.log("Call: " + call);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0].displayName;
      await call.current.answer(callSettings);
    };

    function subscribeToCallEvents() {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        setCallState("Call failed");
        console.log("Call failed: " + callEvent.reason);
        showError(callEvent.reason);
      });

      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallState("Calling... ");
      });

      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallState("Connected");
      });

      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate("Contacts");
      });

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );

      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvents();
      });
    }

    function subscribeToEndpointEvents() {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    }

    function showError(error) {
      Alert.alert("Call failed", "Reason" + error, [
        {text: "OK", onPress: () => navigation.goBack()},
      ]);
    }

    if (isIncoming) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted, voximplant, user.user_name, navigation, isIncoming]);

  function goBack() {
    navigation.goBack();
  }

  function hangupHandler() {
    call.current.hangup();
    navigation.navigate("Contacts");
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ioicons name="chevron-back" color={"white"} size={30} />
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteStream}
      />
      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.videoStream}
      />

      <ContactInfo name={user.user_display_name} status={callState} />
      <CallActionBox onHangupPress={hangupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7b4e80",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  videoStream: {
    width: 100,
    height: 150,
    position: "absolute",
    top: 100,
    right: 15,
    backgroundColor: "black",
    zIndex: 111,
  },
  remoteStream: {
    position: "absolute",
    width: 450,
    height: 300,
    top: 250,
    left: 15,
    borderRadius: 10,
  },
});
