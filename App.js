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
import layout from "./constants/layout";
//redux
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <MainNavigator />
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: layout.window.height,
    backgroundColor: colors.backgroundColor,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
