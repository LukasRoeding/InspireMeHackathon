import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import MainNavigator from "./navigation/Navigatior";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Button } from "react-native";
import "react-native-url-polyfill/auto";

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
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: "Logo for an app with the name Inspire Me",
        n: 1,
        size: "512x512",
      });
      console.log(res.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(configuration)}</Text>
        <Text>Hallo</Text> */}
        <MainNavigator />
        <StatusBar style="auto" />
        {/* <Button title="create Image" onPress={generateImage} /> */}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
