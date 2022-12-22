import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

export default function App() {
  const configuration = new Configuration({
    apiKey: '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',
  });
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
