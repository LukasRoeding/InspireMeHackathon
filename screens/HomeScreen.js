//react-native
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native";
//components
import { Configuration, OpenAIApi } from "openai";
import { Text } from "react-native-paper";

const HomeScreen = (props) => {
  const styles = makeStyles();
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const [text, onChangeText] = React.useState(
    "Write your text describing the image here."
  );
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
    <View style={styles.screen}>
      <TextInput onChangeText={onChangeText} value={text} />
      <Button title="create Image" onPress={generateImage} />
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "green",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default HomeScreen;
