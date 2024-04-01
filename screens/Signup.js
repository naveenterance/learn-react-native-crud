import { useState } from "react";
import {
  TextInput,
  View,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import container_1 from "../components/container_1";
import button_1 from "../components/button_1";
import input_1 from "../components/input_1";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
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
          <Text style={button_1.buttonText}>
            Signup <AntDesign name="login" size={24} color="black" />
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
