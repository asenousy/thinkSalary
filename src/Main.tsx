import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import App from "./components/App";
import { AdMobBanner } from "expo-ads-admob";

export default function Main() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AdMobBanner
        style={{ zIndex: 5 }}
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds
      />
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
