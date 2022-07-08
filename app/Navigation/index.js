import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ContactsScreen from "../screens/ContactsScreen/index";
import CallScreen from "../screens/CallScreen";
import CallingScreen from "../screens/CallingScreen";
import IncomingScreen from "../screens/IncomingScreen";
import LoginScreen from "../screens/Login/index";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />

        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Call" component={CallScreen} />
          <Stack.Screen name="Calling" component={CallingScreen} />
          <Stack.Screen name="Incoming" component={IncomingScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
