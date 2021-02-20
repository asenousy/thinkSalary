import { Alert } from "react-native";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MONTH = 30 * 24 * 60 * 60 * 1000;
const YEAR = 12 * MONTH;
const LAST_REVIEW_DATE = "lastReviewDate";

async function storeDate(overrideDate?: number) {
  const date = overrideDate || Date.now();
  try {
    await AsyncStorage.setItem(LAST_REVIEW_DATE, date.toString());
  } catch (error) {
    if (__DEV__) throw error;
  }
}

async function retrieveDate() {
  try {
    return await AsyncStorage.getItem(LAST_REVIEW_DATE);
  } catch (error) {
    if (__DEV__) throw error;
  }
}

const myReview = () =>
  Alert.alert("Enjoying the App ?", "please support me with a nice review :)", [
    {
      text: "review",
      onPress: StoreReview.requestReview,
    },
    { text: "cancel" },
  ]);

async function review() {
  try {
    const lastReviewDate = await retrieveDate();
    if (lastReviewDate) {
      if (Date.now() - +lastReviewDate > YEAR) {
        StoreReview.isAvailableAsync()
          ? StoreReview.requestReview()
          : myReview();
        await storeDate();
      }
    } else {
      await storeDate(Date.now() - (YEAR - MONTH));
    }
  } catch (error) {
    if (__DEV__) throw error;
  }
}

export default review;
