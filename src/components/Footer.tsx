import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

type Props = {
  onFeedback(): void;
  onSettings(): void;
};

const Footer = (props: Props) => (
  <View style={styles.container}>
    <Pressable style={styles.icon} onPress={props.onFeedback}>
      <AntDesign name="form" size={responsive(36)} color={colours.border} />
    </Pressable>
    <Pressable style={styles.icon} onPress={props.onSettings}>
      <Feather name="settings" size={responsive(36)} color={colours.border} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon: {
      padding: 30,
    },
  })
);

export default Footer;
