import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import "react-native-url-polyfill/auto";
import MainNavigator from "./navigation/Navigatior";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import colors from "./constants/colors";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primaryColor,
      secondary: colors.secondaryColor,
    },
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <MainNavigator />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
