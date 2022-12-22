import React from "react";
import { View, StyleSheet, FlatList, Platform } from "react-native";
//components
import { Text } from "react-native-paper";
import colors from "../constants/colors";
import { List, MD3Colors } from "react-native-paper";
import GridImageView from "react-native-grid-image-viewer";
import layout from "../constants/layout";
import { useDispatch, useSelector } from "react-redux";

const ImageHistory = (props) => {
  const { images } = useSelector((state) => state.images);
  const styles = makeStyles();

  return (
    <View style={styles.component}>
      <Text variant="headlineMedium">History</Text>
      {/* <Text>{JSON.stringify(props.images)}</Text> */}
      <GridImageView data={props.images} />
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    component: {
      backgroundColor: colors.buttonColor,
      flex: 1,
      width: layout.window.width,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
  });

export default ImageHistory;
