import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
//components
import { Text, Button, TextInput } from "react-native-paper";
import colors from "../constants/colors";
//openai
import { Configuration, OpenAIApi } from "openai";
import { x } from "../api-token";
import layout from "../constants/layout";
import { SafeAreaView } from "react-native-safe-area-context";

const TextScreen = (props) => {
  const styles = makeStyles();
  const configuration = new Configuration({
    apiKey: x,
  });
  const openai = new OpenAIApi(configuration);
  const [loading, setLoading] = React.useState(false);
  const [questionText, setquestionText] = React.useState("");
  const [responseText, setResponseText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [images, setImages] = React.useState([]);
  const generateText = async () => {
    setLoading(true);
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: questionText,
        max_tokens: 500,
        temperature: 0,
      });
      setResponseText(res.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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

  const generateImages = async () => {
    setLoading(true);
    let paragraphs = responseText.split("\n\n");
    paragraphs.shift();
    let images = [];
    for (let index = 0; index < paragraphs.length; index++) {
      try {
        const res = await openai.createImage({
          prompt: questionText + paragraphs[index],
          n: 1,
          size: "512x512",
        });
        images.push(res.data.data[0].url);
      } catch (error) {
        console.error(error);
      }
    }
    setImages(images);
    setLoading(false);
  };

  const renderImageButton = () => {
    if (responseText.length > 0)
      return (
        <View>
          <Button
            icon="camera"
            mode="contained"
            onPress={generateImages}
            disabled={loading}
          >
            Generate Comic from Text
          </Button>
        </View>
      );
  };

  const renderImage = () => {
    if (imageUrl.length > 0)
      return (
        <Image
          style={{ width: 300, height: 300, borderRadius: 10 }}
          source={{
            uri: imageUrl,
          }}
        />
      );
  };

  const renderImages = () => {
    if (images.length > 0) {
      let paragraphs = responseText.split("\n\n");
      paragraphs.shift();
      var myloop = [];
      for (let i = 0; i < images.length; i++) {
        myloop.push(
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
            key={i}
          >
            <Image
              style={{ width: 250, height: 250, borderRadius: 10 }}
              source={{
                uri: images[i],
              }}
            />
            <Text
              style={{
                margin: 10,
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.buttonColor,
              }}
            >
              {paragraphs[i]}
            </Text>
          </View>
        );
      }
      return myloop;
    }
  };

  const activityIndicator = () => {
    if (loading) return <ActivityIndicator size="large" color="#00ff00" />;
  };

  return (
    <SafeAreaView>
      <ScrollView style={{}}>
        <View style={styles.screen}>
          {/* {activityIndicator()} */}
          <TextInput
            label="Theme of the story"
            onChangeText={setquestionText}
            value={questionText}
            style={{ marginBottom: 10, width: layout.window.width - 30 }}
          />
          <Button
            icon="text"
            mode="contained"
            onPress={generateText}
            disabled={loading}
          >
            Generate Text
          </Button>
          <Text
            style={{
              paddingTop: 0,
              margin: 20,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.buttonColor,
            }}
          >
            {responseText}
          </Text>
          {renderImageButton()}
          {renderImage()}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {renderImages()}
          </View>
          {activityIndicator()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      paddingTop: 20,
      flex: 1,
      minHeight: layout.window.height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.backgroundColor,
    },
  });

export default TextScreen;
