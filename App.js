import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import MainNavigator from "./navigation/navigation";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };
  const configuration = new Configuration({
    apiKey: "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",
  });
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Text>Hallo</Text>
          <MainNavigator />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
