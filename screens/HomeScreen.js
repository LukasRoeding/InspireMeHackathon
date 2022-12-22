//react-native
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
//components
import { Configuration, OpenAIApi } from "openai";
import { Text } from "react-native-paper";
import { x } from "../api-token";
import colors from "../constants/colors";
import { useTheme } from "react-native-paper";
import ImageHistory from "../components/ImageHistory";
//store
import { imageAdded } from "../store/images";
import { persistor } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = (props) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = makeStyles();
  console.log(x);
  const configuration = new Configuration({
    apiKey: x,
  });
  const openai = new OpenAIApi(configuration);

  const [text, onChangeText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const generateImage = async () => {
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: text,
        n: 1,
        size: "1024x1024",
      });
      setImageUrl(res.data.data[0].url);
      dispatch(imageAdded({ image_url: res.data.data[0].url }));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderImage = () => {
    if (imageUrl.length > 0)
      return (
        <View style={{ marginBottom: 10 }}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
      );
  };

  const activityIndicator = () => {
    if (loading == true)
      return <ActivityIndicator size="large" color="#00ff00" />;
  };

  return (
    <SafeAreaView style={styles.screen}>
      {activityIndicator()}
      <View style={styles.screenContainer}>
        <TextInput
          style={{ marginBottom: 10 }}
          onChangeText={onChangeText}
          value={text}
          placeholder="Write your text describing the image here."
        />
        <Button
          icon="camera"
          mode="contained"
          onPress={generateImage}
          style={{ marginBottom: 10 }}
        >
          Generate Image
        </Button>
        {renderImage()}
      </View>
      <ImageHistory />
    </SafeAreaView>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      // alignItems: "center",
      // justifyContent: "center",
      backgroundColor: colors.backgroundColor,
      paddingTop: 15,
    },
    screenContainer: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default HomeScreen;
