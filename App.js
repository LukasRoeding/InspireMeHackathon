import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { Button, TextInput } from 'react-native';
import 'react-native-url-polyfill/auto';
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
  const [text, onChangeText] = React.useState("Write your text describing the image here.");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: text,
        n: 1,
        size: "512x512",
      });
      console.log(res.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <MainNavigator />
          <TextInput
            onChangeText={onChangeText}
            value={text}
          />
          <Button title="create Image" onPress={generateImage} />
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
