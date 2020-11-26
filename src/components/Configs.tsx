import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from "react-native";
import { Picker } from "@react-native-community/picker";

const windowWidth = Dimensions.get("window").width;
const animDuration = 200;
const LOWER_PADDING = 60;
const plans = ["none", "one", "two"];

type ConfigsProps = {
  visible: boolean;
  onBackgroundPress: () => void;
  onChange: (name: string, value: any) => void;
  configs: { loanPlan: number; pensionRate: string; scotlandTax: boolean };
};

export default function Configs(props: ConfigsProps) {
  const {
    visible,
    onBackgroundPress,
    onChange,
    configs: { loanPlan, pensionRate, scotlandTax },
  } = props;

  const [position, setPosition] = useState(-windowWidth);

  const slideAnim = useRef(new Animated.Value(-windowWidth)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: animDuration,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = (cb: any) => {
    Animated.timing(slideAnim, {
      toValue: -windowWidth,
      duration: animDuration,
      useNativeDriver: false,
    }).start(cb);
  };

  useEffect(() => {
    if (visible) {
      slideIn();
      setPosition(0);
    } else {
      slideOut(() => setPosition(-windowWidth));
    }
  }, [visible]);

  return (
    <View style={{ ...styles.container, right: position }}>
      <TouchableWithoutFeedback onPress={onBackgroundPress}>
        <View style={styles.dimLayer} />
      </TouchableWithoutFeedback>
      <Animated.View style={{ ...styles.modal, right: slideAnim }}>
        <View style={styles.row}>
          <Text style={styles.label}>Scotland Tax :</Text>
          <Switch
            style={styles.input}
            value={scotlandTax}
            onValueChange={(val) => onChange("scotlandTax", val)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Student Plan:</Text>
          <Picker
            style={styles.input}
            selectedValue={loanPlan}
            itemStyle={styles.picker}
            onValueChange={(val, i) => onChange("loanPlan", i)}
          >
            {plans.map((plan, i) => (
              <Picker.Item key={`plan-${plan}`} label={plan} value={i} />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pension % :</Text>
          <TextInput
            style={styles.pensionInput}
            value={pensionRate}
            keyboardType="numeric"
            clearButtonMode="while-editing"
            onChangeText={(text) => onChange("pensionRate", text)}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
  dimLayer: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    paddingTop: 30,
    minWidth: "80%",
    height: "80%",
    alignContent: "center",
    alignItems: "center",
    bottom: LOWER_PADDING,
    right: 0,
    backgroundColor: "aliceblue",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginHorizontal: 10,
    fontSize: 15,
  },
  input: {
    marginHorizontal: 10,
  },
  pensionInput: {
    marginHorizontal: 10,
    fontSize: 15,
    borderRadius: 2,
    borderWidth: 0.3,
    borderColor: "dodgerblue",
    backgroundColor: "white",
    textAlign: "center",
    height: 30,
    width: 80,
  },
  picker: {
    fontSize: 15,
    width: 100,
    height: 120,
  },
});
