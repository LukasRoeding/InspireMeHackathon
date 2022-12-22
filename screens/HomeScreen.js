//react-native
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
//components
import { Configuration, OpenAIApi } from "openai";
import { Text } from "react-native-paper";
import { x } from "../api-token";
import colors from "../constants/colors";
import { useTheme } from "react-native-paper";

const HomeScreen = (props) => {
  const theme = useTheme();
  const styles = makeStyles();
  console.log(x);
  const configuration = new Configuration({
    apiKey: x,
  });
  const openai = new OpenAIApi(configuration);

  const [text, onChangeText] = React.useState(
    "Write your text describing the image here."
  );
  const [imageUrl, setImageUrl] = React.useState("");
  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: text,
        n: 1,
        size: "512x512",
      });
      setImageUrl(res.data.data[0].url);
      console.log(res.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
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
      <TextInput onChangeText={onChangeText} value={text} />
      <Button icon="camera" mode="contained" onPress={generateImage}>
        Generate Image
      </Button>
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

export default HomeScreen;
