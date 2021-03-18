import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

type ConfigsIconProps = {
  onClick: () => void;
};

const ConfigsIcon = (props: ConfigsIconProps) => (
  <View style={styles.configs}>
    <Pressable onPress={props.onClick}>
      <Feather
        style={styles.icon}
        name="settings"
        size={responsive(36)}
        color="white"
      />
    </Pressable>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    configs: {
      position: "absolute",
      right: 0,
      bottom: 0,
      margin: 30,
    },
    icon: {
      color: colours.border,
    },
  })
);

export default ConfigsIcon;