import React from "react";
import { View, StyleSheet, Image } from "react-native";
//components
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

const SettingScreen = (props) => {
  const styles = makeStyles();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View
          style={{
            paddingBottom: 10,
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge" style={{ paddingBottom: 10 }}>
            Powered by Hyrule Warriors
          </Text>
          <Image
            style={{ width: 200, height: 200, borderRadius: 10 }}
            source={require("../assets/InspireMe.png")}
          />
        </View>
        <Text variant="titleMedium" style={{ paddingBottom: 20 }}>
          © Hackathon Bits&Likes 2022
        </Text>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingTop: 20,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.backgroundColor,
    },
  });

export default SettingScreen;
