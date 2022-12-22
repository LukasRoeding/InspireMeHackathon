import React from "react";
import { View, StyleSheet, Image } from "react-native";
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
  const [imageUrl, setImageUrl] = React.useState("");
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

  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: responseText,
        n: 1,
        size: "512x512",
      });
      setImageUrl(res.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
  };

  const renderImageButton = () => {
    if (responseText.length > 0)
      return (
        <Button icon="camera" mode="contained" onPress={generateImage}>
          Generate Image from Text
        </Button>
      );
  };


  const renderImage = () => {
    if (imageUrl.length > 0)
      return (
        <Image
          style={{ width: 300, height: 300 }}
          source={{
            uri: imageUrl,
          }}
        />
      );
  };

  return (
    <View style={styles.screen}>
      <TextInput onChangeText={setquestionText} value={questionText} />
      <Button icon="camera" mode="contained" onPress={generateText}>
        Generate Text
      </Button>
      <Text>{responseText}</Text>
      {renderImageButton()}
      {renderImage()}
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
