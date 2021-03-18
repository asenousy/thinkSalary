import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

type ContactUsIconProps = {
  onClick: () => void;
};

const ContactUsIcon = (props: ContactUsIconProps) => (
  <View style={styles.contactUs}>
    <Pressable onPress={props.onClick}>
      <Feather
        style={styles.icon}
        name="mail"
        size={responsive(36)}
        color="white"
      />
    </Pressable>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    contactUs: {
      position: "absolute",
      left: 0,
      bottom: 0,
      margin: 30,
    },
    icon: {
      color: colours.border,
    },
  })
);

export default ContactUsIcon;
