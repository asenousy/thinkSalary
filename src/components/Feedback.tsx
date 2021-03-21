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
import { responsive } from "../helpers";
import * as StoreReview from "expo-store-review";

type Props = {
  onBackgroundPress: () => void;
};

export default (props: Props) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={props.onBackgroundPress}>
      <View style={styles.dimlayer} />
    </TouchableWithoutFeedback>
    <View style={styles.modal}>
      <Text style={styles.content}>
        Would love to hear your suggestions, questions or feedback
      </Text>
      <View style={styles.row}>
        <Pressable
          onPress={() =>
            Linking.openURL(
              `mailto:hanounasoft+thinkSalary@hotmail.com?subject=thinkSalary-${Platform.OS}-v${jsVersion}`
            )
          }
        >
          <Text style={styles.button}>Email Us</Text>
        </Pressable>
        <View style={styles.title}>
          <Text>or</Text>
        </View>
        <Pressable
          onPress={() =>
            StoreReview.isAvailableAsync()
              .then((avail) => avail && void StoreReview.requestReview())
              .catch((err) => __DEV__ && console.error(err))
          }
        >
          <Text style={styles.button}>Review Us</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create(
  responsive({
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
      padding: 20,
      alignItems: "center",
    },
    title: {
      justifyContent: "center",
      marginHorizontal: 5,
    },
    content: {
      margin: 10,
      fontSize: 13,
    },
    button: {
      backgroundColor: "#D8E7EE",
      fontSize: 13,
      borderRadius: 10,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: "row",
    },
  })
);
