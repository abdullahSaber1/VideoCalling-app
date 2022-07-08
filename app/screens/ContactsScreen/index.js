import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";

import contacts from "../../../assets/data/contacts.json";
import SearchScreen from "../SearchScreen";
import {Voximplant} from "react-native-voximplant";

import {useNavigation} from "@react-navigation/native";

function Contacts() {
  const [searchText, setSearchText] = useState("");
  const [filterContacts, setFilterContacts] = useState(contacts);

  const voximplant = Voximplant.getInstance();

  const navigation = useNavigation();

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate("Incoming", {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, [navigation, voximplant]);

  function onChangeHandler(text) {
    setSearchText(text);
    const newContacts = contacts.filter(contact =>
      contact.user_display_name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilterContacts(newContacts);
  }

  function callUser(user) {
    navigation.navigate("Calling", {
      user,
    });
  }

  function renderItem({item}) {
    return (
      <Pressable onPress={callUser.bind(this, item)}>
        <View style={styles.Contactcontainer}>
          <Text style={styles.contactName}>{item.user_display_name}</Text>
        </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.container}>
      <SearchScreen value={searchText} onSearch={onChangeHandler} />
      <FlatList
        data={filterContacts}
        renderItem={renderItem}
        keyExtractor={item => item.user_id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  Contactcontainer: {
    padding: 20,
  },
  contactName: {
    fontSize: 18,
    color: "black",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
});

export default Contacts;
