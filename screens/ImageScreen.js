import React from "react";
import { View, StyleSheet } from "react-native";
//components
import { Text } from "react-native-paper";

const ImageScreen = (props) => {
  const styles = makeStyles();

  return (
    <View style={styles.screen}>
      <Text>SettingScreen</Text>
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
  });

export default ImageScreen;
