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

type SettingsProps = {
  onBackgroundPress: () => void;
  onChange: (name: string, value: string | number | boolean) => void;
  configs: {
    loanPlan: number;
    pensionRate: string;
    scotlandTax: boolean;
    hoursPerWeek: string;
  };
};

export default function Settings(props: SettingsProps) {
  const {
    onBackgroundPress,
    onChange,
    configs: { loanPlan, pensionRate, scotlandTax, hoursPerWeek },
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
        <HoursPerWeek hours={hoursPerWeek} onChange={onChange} />
      </View>
    </View>
  );
}

type ScotlandTaxProps = {
  enabled: boolean;
  onChange: SettingsProps["onChange"];
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
  onChange: SettingsProps["onChange"];
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
  onChange: SettingsProps["onChange"];
};

const Pension = ({ rate, onChange }: PensionProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>Pension % :</Text>
    <TextInput
      style={styles.input}
      value={rate}
      keyboardType="numeric"
      clearButtonMode="while-editing"
      onChangeText={(text) => onChange("pensionRate", text)}
    />
  </View>
);

type HoursPerWeekProps = {
  hours: string;
  onChange: SettingsProps["onChange"];
};

const HoursPerWeek = ({ hours, onChange }: HoursPerWeekProps) => (
  <View style={{ ...styles.row, marginTop: 20 }}>
    <Text style={styles.label}>Hours Per Week :</Text>
    <TextInput
      style={styles.input}
      value={hours}
      keyboardType="numeric"
      clearButtonMode="while-editing"
      onChangeText={(text) => onChange("hoursPerWeek", text)}
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
      marginBottom: 125,
      borderRadius: 10,
      padding: 40,
      backgroundColor: colours.background,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      marginHorizontal: 10,
      fontSize: 15,
    },
    picker: {
      alignItems: "center",
    },
    switch: {
      marginHorizontal: 20,
    },
    input: {
      fontSize: 15,
      marginRight: 10,
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
