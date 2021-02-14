import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { colours } from "../constants.json";
import { jsVersion } from "../../configs.json";

type Props = {
  onBackgroundPress: () => void;
};

export default (props: Props) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={props.onBackgroundPress}>
      <View style={styles.dimlayer} />
    </TouchableWithoutFeedback>
    <View style={styles.modal}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.content}>
        Would love to hear your suggestions, questions or feedback
      </Text>
      <Pressable
        onPress={() =>
          Linking.openURL(
            `mailto:hanounasoft+thinkSalary@hotmail.com?subject=thinkSalary-${Platform.OS}-v${jsVersion}`
          )
        }
      >
        <Text style={styles.button}>Email Us</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dimlayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.5,
  },
  modal: {
    borderRadius: 10,
    backgroundColor: colours.background,
    maxWidth: 285,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 20,
  },
  content: {
    margin: 10,
  },
  button: {
    backgroundColor: "#D8E7EE",
    borderRadius: 10,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
