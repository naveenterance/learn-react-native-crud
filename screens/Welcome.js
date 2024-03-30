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
      style={styles.background}
    >
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1.0 },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>
            Login <AntDesign name="login" size={24} color="black" />
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1.0 },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>
            Sign Up <AntDesign name="adduser" size={24} color="black" />
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    margin: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    borderWidth: 4,
    padding: 20,
    margin: 20,
    width: 150,
    height: 80,
  },
  buttonText: {
    color: "black",
    textAlign: "center",

    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Welcome;
