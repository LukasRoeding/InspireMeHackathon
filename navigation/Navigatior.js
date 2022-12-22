import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ImageScreen from "../screens/ImageScreen";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Texts"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="text" color={color} size={26} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Images"
          component={ImageScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="image" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
