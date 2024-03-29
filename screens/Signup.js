import { useState } from "react";
import { Button, TextInput, View } from "react-native";

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
