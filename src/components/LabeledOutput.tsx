import React, { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { responsive } from "../helpers";

type Props = {
  label: string;
  value: string;
};

const LabeledOutput: FC<Props> = ({ label, value }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.label}>{value}</Text>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
      margin: 10,
    },
    label: {
      textAlign: "center",
      minWidth: 70,
      fontWeight: "bold",
      padding: 5,
      fontSize: 20,
    },
  })
);

export default memo(LabeledOutput);
