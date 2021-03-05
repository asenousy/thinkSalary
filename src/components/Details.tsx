import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colours } from "../constants.json";
import { responsive } from "../helpers";

type Details = {
  gross: number;
  pension: number;
  loan: number;
  taxable: number;
  tax: number;
  ni: number;
};

type Props = {
  figures: Details;
};

const Details: FC<Props> = (props) => {
  const { gross, pension, loan, taxable, tax, ni } = props.figures;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Gross Salary:</Text>
        <Text style={styles.text}>{gross}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Pension:</Text>
        <Text style={styles.text}>{pension}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Student Loan:</Text>
        <Text style={styles.text}>{loan}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Taxable Amount:</Text>
        <Text style={styles.text}>{taxable}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Tax:</Text>
        <Text style={styles.text}>{tax}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>National Insurance:</Text>
        <Text style={styles.text}>{ni}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
  responsive({
    container: {
      backgroundColor: colours.content,
      padding: 15,
      margin: 10,
      borderRadius: 10,
      minWidth: 220,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 10,
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      margin: 5,
      fontSize: 13,
    },
  })
);

export default Details;
