import React, { FC, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

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

function fixDecimal(figures: Details) {
  return Object.entries(figures).reduce((fixed, [key, value]) => {
    fixed[key] = value.toFixed(2);
    return fixed;
  }, {} as any);
}

const Details: FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const { gross, pension, loan, taxable, tax, ni } = fixDecimal(props.figures);
  return (
    <View style={styles.container}>
      <View style={{ ...styles.box, ...(show ? {} : { height: 40 }) }}>
        <Button
          color="black"
          title={`${show ? "hide" : "show"} details`}
          onPress={() => setShow(!show)}
        />
        <Text style={styles.line}>{`Gross Salary: £${gross}`}</Text>
        <Text style={styles.line}>{`Pension: £${pension}`}</Text>
        <Text style={styles.line}>{`Student Loan: £${loan}`}</Text>
        <Text style={styles.line}>{`Taxable Amount: £${taxable}`}</Text>
        <Text style={styles.line}>{`Tax: £${tax}`}</Text>
        <Text style={styles.line}>{`National Insurance: £${ni}`}</Text>
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
