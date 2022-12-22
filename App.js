import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { Button, TextInput } from 'react-native';
import 'react-native-url-polyfill/auto';

export default function App() {
  const [text, onChangeText] = React.useState("Write your text describing the image here.");
  const configuration = new Configuration({
    apiKey: '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',
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
    } 
    catch(error) {
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
      />
      <Button 
        title='create Image'
        onPress={generateImage} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
