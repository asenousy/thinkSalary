import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, AppState, AppStateStatus } from "react-native";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import App from "./components/App";
import { AdMobBanner } from "expo-ads-admob";
import { Platform } from "react-native";
import configs from "../configs.json";
import storeReview from "./storeReview";

const AD_UNIT_ID = __DEV__
  ? configs.testAdUnitID
  : (configs as any)[Platform.OS].adUnitID;

export default function Main() {
  const appState = useState(AppState.currentState);
  const handleAppStateChangeCurried = (handleAppStateChange.bind as any)(
    null,
    appState
  );

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChangeCurried);
    return () => {
      AppState.removeEventListener("change", handleAppStateChangeCurried);
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.wrapper}>
        <App />
        <AdMobBanner adUnitID={AD_UNIT_ID} servePersonalizedAds />
      </View>
    </View>
  );
}

const handleAppStateChange = async (
  [appState, setAppState]: any,
  nextAppState: AppStateStatus
) => {
  if (
    appState.match(/inactive|background/) &&
    nextAppState === "active" &&
    !__DEV__
  ) {
    storeReview();
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      if (__DEV__) throw error;
    }
  }
  setAppState(nextAppState);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  wrapper: {
    flex: 1,
  },
});
