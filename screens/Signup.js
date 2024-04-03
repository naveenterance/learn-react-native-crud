import { useState } from "react";
import {
  TextInput,
  View,
  Pressable,
  ImageBackground,
  Text,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import container_1 from "../components/container_1";
import button_1 from "../components/button_1";
import input_1 from "../components/input_1";
import * as Notifications from "expo-notifications";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();

  const handleSignUp = async () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      clearInterval(interval);
    }, 3000);

    try {
      const response = await fetch(
        `https://chat-node-naveenterances-projects.vercel.app/users/${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          alert("Username not available");
          return;
        }
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }

    try {
      const response = await fetch(
        "https://chat-node-naveenterances-projects.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign up failed");
      }
      setLoading("loading");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Account created successfully",
        },
        trigger: { seconds: 2 },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/flower.jpeg")}
      style={container_1.background}
    >
      <View
        style={{
          marginBottom: "40%",
          flexDirection: "column",
          padding: 20,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TextInput
          placeholder="Username"
          value={name}
          onChangeText={setName}
          style={input_1.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={input_1.input}
        />
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            { marginTop: "10%" },
          ]}
          onPress={handleSignUp}
        >
          {!loading ? (
            <Text style={button_1.buttonText}>
              Signup <AntDesign name="login" size={24} color="black" />
            </Text>
          ) : (
            <ActivityIndicator size="medium" color="gray" />
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
