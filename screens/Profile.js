import React, { useEffect, useState } from "react";
import { Button, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import button_1 from "../components/button_1";

const Profile = () => {
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
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error retrieving user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name="account-circle" size={48} color="black" />
        <Text style={{ marginLeft: 10 }}>{user.name}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          button_1.button,
          { opacity: pressed ? 0.5 : 1.0 },
          ,
          { borderColor: "gray" },
        ]}
        onPress={handleLogout}
      >
        <Text style={button_1.buttonText}>
          Logout <AntDesign name="logout" size={24} color="black" />
        </Text>
      </Pressable>

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate("Cart", { cart })}
      />
    </View>
  );
};

export default Profile;
