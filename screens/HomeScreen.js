//react-native
import React from "react";
import { View, StyleSheet } from "react-native";
//components
import { Text } from "react-native-paper";

const HomeScreen = (props) => {
  const styles = makeStyles();

  return (
    <View style={styles.screen}>
      <Text>Hallo</Text>
      <Text variant="displayLarge">HomeScreen</Text>
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
