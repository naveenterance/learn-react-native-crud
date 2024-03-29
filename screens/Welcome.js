import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";

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
    <View>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

export default Welcome;
