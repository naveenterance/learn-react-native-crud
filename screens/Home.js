import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Login");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error retrieving user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View>
      {user ? (
        <View>
          <Text>Welcome, {user.name}!</Text>

          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
