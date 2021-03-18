import React, { Props } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { colours } from "../constants.json";
import { Picker } from "@react-native-community/picker";
import { responsive } from "../helpers";

const plans = ["none", "one", "two", "post grad"];

type ConfigsProps = {
  onBackgroundPress: () => void;
  onChange: (name: string, value: string | number | boolean) => void;
  configs: { loanPlan: number; pensionRate: string; scotlandTax: boolean };
};

export default function Configs(props: ConfigsProps) {
  const {
    onBackgroundPress,
    onChange,
    configs: { loanPlan, pensionRate, scotlandTax },
  } = props;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onBackgroundPress}>
        <View style={styles.dimLayer} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <ScotlandTax enabled={scotlandTax} onChange={onChange} />
        <StudentPlan plan={loanPlan} onChange={onChange} />
        <Pension rate={pensionRate} onChange={onChange} />
      </View>
    </View>
  );
}

type ScotlandTaxProps = {
  enabled: boolean;
  onChange: ConfigsProps["onChange"];
};

const ScotlandTax = ({ enabled, onChange }: ScotlandTaxProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>Scotland Tax :</Text>
    <Switch
      style={styles.switch}
      value={enabled}
      onValueChange={(val) => onChange("scotlandTax", val)}
    />
  </View>
);

type StudentPlanProps = {
  plan: number;
  onChange: ConfigsProps["onChange"];
};

const StudentPlan = ({ plan, onChange }: StudentPlanProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>Student Plan:</Text>
    <Picker
      style={{
        ...styles.picker,
        ...(Platform.OS === "android" ? { width: 100 } : {}),
      }}
      mode="dropdown"
      selectedValue={plan}
      itemStyle={styles.pickerItem}
      onValueChange={(val, i) => onChange("loanPlan", i)}
    >
      {plans.map((plan, i) => (
        <Picker.Item key={`plan-${plan}`} label={plan} value={i} />
      ))}
    </Picker>
  </View>
);

type PensionProps = {
  rate: string;
  onChange: ConfigsProps["onChange"];
};

const Pension = ({ rate, onChange }: PensionProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>Pension % :</Text>
    <TextInput
      style={styles.pensionInput}
      value={rate}
      keyboardType="numeric"
      clearButtonMode="while-editing"
      onChangeText={(text) => onChange("pensionRate", text)}
    />
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      position: "absolute",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    dimLayer: {
      position: "absolute",
      backgroundColor: "black",
      opacity: 0.5,
      width: "100%",
      height: "100%",
    },
    modal: {
      borderRadius: 10,
      padding: 40,
      alignItems: "center",
      backgroundColor: colours.background,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      marginHorizontal: 10,
      fontSize: 15,
    },
    picker: {
      alignItems: "center",
      marginHorizontal: 10,
    },
    switch: {
      marginHorizontal: 10,
    },
    pensionInput: {
      marginHorizontal: 10,
      fontSize: 15,
      borderRadius: 2,
      borderWidth: 0.3,
      borderColor: colours.border,
      backgroundColor: "white",
      textAlign: "center",
      height: 30,
      width: 80,
    },
    pickerItem: {
      fontSize: 15,
      width: 100,
      height: 120,
    },
  })
);
