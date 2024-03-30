import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

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
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput placeholder="Username" onChangeText={setName} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
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
      </View>
    </ImageBackground>
  );
};

LoginScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <Button title="Back" onPress={() => navigation.navigate("Welcome")} />
  ),
});

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

export default LoginScreen;
