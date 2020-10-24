import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Details = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ ...styles.box, ...(show ? {} : { height: 40 }) }}>
        <Button
          color="black"
          title={`${show ? "hide" : "show"} details`}
          onPress={() => setShow(!show)}
        />
        <Text style={styles.line}>Gross Salary: £2000</Text>
        <Text style={styles.line}>Pension: £100</Text>
        <Text style={styles.line}>Student Loan: £100</Text>
        <Text style={styles.line}>Taxable Amount: £1000</Text>
        <Text style={styles.line}>Tax: £100</Text>
        <Text style={styles.line}>National Insurance: £200</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 40,
    overflow: "hidden",
  },
  line: {
    padding: 10,
  },
});

export default Details;
