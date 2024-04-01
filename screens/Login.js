import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import container_1 from "../components/container_1";
import button_1 from "../components/button_1";
import input_1 from "../components/input_1";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://chat-node-naveenterances-projects.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      await AsyncStorage.setItem("jwtToken", responseData.token);

      navigation.navigate("Home");
    } catch (error) {
      alert("Invalid credentials");
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
          onChangeText={setName}
          style={input_1.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={input_1.input}
        />
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            { marginTop: "10%" },
          ]}
          onPress={handleLogin}
        >
          <Text style={button_1.buttonText}>
            Login <AntDesign name="login" size={36} color="black" />
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

LoginScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <Button title="Back" onPress={() => navigation.navigate("Welcome")} />
  ),
});

export default LoginScreen;
