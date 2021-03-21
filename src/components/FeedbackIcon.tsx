import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

type FeedbackIconProps = {
  onClick: () => void;
};

const FeedbackIcon = (props: FeedbackIconProps) => (
  <View style={styles.container}>
    <Pressable onPress={props.onClick}>
      <AntDesign name="form" size={responsive(36)} color={colours.border} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      position: "absolute",
      left: 0,
      bottom: 0,
      margin: 30,
    },
  })
);

export default FeedbackIcon;
