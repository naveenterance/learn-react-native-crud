import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { AntDesign } from "@expo/vector-icons";
import container_1 from "../components/container_1";
import button_1 from "../components/button_1";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        navigation.navigate("Home");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/flower.jpeg")}
      style={container_1.background}
    >
      <View style={container_1.container}>
        <Pressable
          style={({ pressed }) => [
            button_1.button,
            { opacity: pressed ? 0.5 : 1.0 },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={button_1.buttonText}>
            Login <AntDesign name="login" size={24} color="black" />
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            button_1.button,
            { opacity: pressed ? 0.5 : 1.0 },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={button_1.buttonText}>
            Sign Up <AntDesign name="adduser" size={24} color="black" />
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
