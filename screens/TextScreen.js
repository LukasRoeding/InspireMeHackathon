import React from "react";
import { View, StyleSheet } from "react-native";
//components
import { Text, Button, TextInput } from "react-native-paper";
import colors from "../constants/colors";
//openai
import { Configuration, OpenAIApi } from "openai";
import { x } from "../api-token";

const TextScreen = (props) => {
  const styles = makeStyles();
  const configuration = new Configuration({
    apiKey: x,
  });
  const openai = new OpenAIApi(configuration);
  const [questionText, setquestionText] = React.useState(
    "What do you want?"
  );
  const [responseText, setResponseText] = React.useState(
    ""
  );
  const generateText = async () => {
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: questionText,
        max_tokens: 250,
        temperature: 0,
      })
      setResponseText(res.data.choices[0].text)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.screen}>
      <TextInput onChangeText={setquestionText} value={questionText} />
      <Button icon="camera" mode="contained" onPress={generateText}>
        Generate Text
      </Button>
      <Text>{responseText}</Text>
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.backgroundColor,
    },
  });

export default TextScreen;
