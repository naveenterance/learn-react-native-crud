import { useState } from "react";
import { Button, TextInput, View } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://chat-node-naveenterances-projects.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign up failed");
      }

      // Sign up successful, navigate to the login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle sign-up error
    }
  };

  return (
    <View>
      <TextInput placeholder="Username" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
