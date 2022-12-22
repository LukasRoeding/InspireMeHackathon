import React from "react";
import { View, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
//components
import { Text, Button, TextInput } from "react-native-paper";
import colors from "../constants/colors";
//openai
import { Configuration, OpenAIApi } from "openai";
import { x } from "../api-token";
import layout from "../constants/layout";

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
    setLoading(true)
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
    setLoading(false)
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
    setLoading(true)
    let paragraphs = responseText.split('\n\n')
    paragraphs.shift();
    let images = [];
    for (let index = 0; index < paragraphs.length; index++) {
      try {
        const res = await openai.createImage({
          prompt: questionText + paragraphs[index],
          n: 1,
          size: "512x512",
        });
        images.push(res.data.data[0].url)
      } catch (error) {
        console.error(error);
      }
    }
    setImages(images)
    setLoading(false)
  };

  const renderImageButton = () => {
    if (responseText.length > 0)
      return (
        <View>
          <Button icon="camera" mode="contained" onPress={generateImages}>
            Generate Comic from Text
          </Button>
        </View>
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

  const renderImages = () => {
    if(images.length > 0) {
      let paragraphs = responseText.split('\n\n')
      paragraphs.shift();
      var myloop = [];
      for (let i = 0; i < images.length; i++) {
        myloop.push(
          <View style={{justifyContent:"center", alignItems:"center", margin: 10}} key={i}>
            <Image
              style={{ width: 250, height: 250 }}
              source={{
                uri: images[i],
              }}
            />
            <Text style={{margin: 10}}>{paragraphs[i]}</Text>
          </View>
        );
      }
      return (myloop);
    }
  }

  const activityIndicator = () => {
    if (loading == true)
      return <ActivityIndicator size="large" color="#00ff00" />;
  };

  return (
    <ScrollView style={{}}>
      <View style={styles.screen}>
        {activityIndicator()}
        <TextInput onChangeText={setquestionText} value={questionText} />
        <Button icon="camera" mode="contained" onPress={generateText}>
          Generate Text
        </Button>
        <Text style={{marginLeft: 20, marginRight: 20}}>{responseText}</Text>
        {renderImageButton()}
        {renderImage()}
        <View style={{justifyContent:"center", alignItems:"center"}}>{renderImages()}</View>
        {activityIndicator()}
      </View>
    </ScrollView>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      minHeight: layout.window.height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.backgroundColor,
    },
  });

export default TextScreen;
