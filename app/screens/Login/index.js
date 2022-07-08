import {Alert, Pressable, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";

import {Voximplant} from "react-native-voximplant";
import {ACC_NAME, APP_NAME} from "../../constance";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

export default function LoginScreen() {
  const voximplant = Voximplant.getInstance();

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function connectVoximplant() {
      let clientState = await voximplant.getClientState();

      if (clientState === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (clientState === Voximplant.ClientState.LOGGED_IN) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Contacts",
            },
          ],
        });
      }
      console.log("Voximplant client state: " + clientState);
    }
    connectVoximplant();
  }, [navigation, voximplant]);

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  function onChangeHandler(inputName, value) {
    setInputs({...inputs, [inputName]: value});
  }

  async function loginHandler() {
    try {
      const fq_userName = `${inputs.userName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      console.log("fq_userName: " + fq_userName);
      const loggedIn = await voximplant.login(fq_userName, inputs.password);
      if (loggedIn) {
        navigation.replace("Contacts");
        console.log("Login success");
      } else {
        Alert.alert("Login failed", "Please check your user name and password");
      }
    } catch (e) {
      Alert.alert("Login failed", e.code + " " + e.name);
      console.log(e);
    }
  }
  return (
    <View style={styles.rootScreen}>
      <Input
        inputConfig={{
          placeholder: "userName",
          placeholderTextColor: "lightgray",
          autoCaptialize: "none",
          value: inputs.userName,
          onChangeText: onChangeHandler.bind(this, "userName"),
        }}
      />
      <Input
        inputConfig={{
          placeholder: "password",
          placeholderTextColor: "lightgray",
          secureTextEntry: !showPassword,
          value: inputs.password,
          onChangeText: onChangeHandler.bind(this, "password"),
        }}
        right={
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.right}>
            <Ionicons
              name={showPassword ? "ios-eye-off" : "ios-eye"}
              size={30}
              color="black"
            />
          </Pressable>
        }
      />
      <Button onPress={loginHandler}>SignIn</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  right: {
    flex: 0.2,
    borderLeftWidth: 2,
    borderLeftColor: "#7b4e80",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
