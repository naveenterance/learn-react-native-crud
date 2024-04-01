import React, { useEffect, useState } from "react";
import { Button, Text, View, Pressable, Image, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {
  MaterialIcons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import button_1 from "../components/button_1";

const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (flower) => {
    const existingItemIndex = cart.findIndex((item) => item.name === flower);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      setCart([...cart, { name: flower, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (flower) => {
    const existingItemIndex = cart.findIndex((item) => item.name === flower);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity--;
      if (updatedCart[existingItemIndex].quantity === 0) {
        updatedCart.splice(existingItemIndex, 1); // Remove item if quantity becomes 0
      }
      setCart(updatedCart);
    }
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

  const flowers_slide = [
    { id: 1, name: "Rose", image: require("../assets/rose.jpeg") },
    { id: 2, name: "Lily", image: require("../assets/lily.jpeg") },
    { id: 3, name: "Sunflower", image: require("../assets/sunflower.jpeg") },
    { id: 4, name: "Tulip", image: require("../assets/tulip.jpeg") },
    { id: 5, name: "Daisy", image: require("../assets/daisy.jpeg") },
  ];

  useEffect(() => {
    if (route.params?.updatedCart) {
      setCart(route.params.updatedCart);
    }
  }, [route.params?.updatedCart]);

  if (!user) {
    return null;
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 },
          { marginRight: "90%" },
        ]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={{ marginTop: "100%", marginBottom: "100%" }}>
          <MaterialCommunityIcons name="menu" size={36} color="black" />
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 },
          { marginBottom: "10%" },
        ]}
        onPress={() => navigation.navigate("Cart", { cart })}
      >
        <Text style={button_1.buttonText}>
          Cart
          <AntDesign name="shoppingcart" size={24} color="black" />
        </Text>
      </Pressable>

      <ScrollView>
        <View style={{ marginBottom: "50%" }}>
          {flowers_slide.map((flower, index) => {
            const cartItem = cart.find((item) => item.name === flower.name);
            return (
              <View key={index} style={{ marginTop: "10%" }}>
                <Image source={flower.image} style={{ height: 200 }} />
                <Text style={button_1.buttonText}>{flower.name}</Text>
                {cartItem ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Button
                      title="-"
                      onPress={() => decreaseQuantity(flower.name)}
                    />
                    <Text>{cartItem.quantity}</Text>
                    <Button title="+" onPress={() => addToCart(flower.name)} />
                  </View>
                ) : (
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                    onPress={() => addToCart(flower.name)}
                  >
                    <Text style={button_1.buttonText}>
                      Add to Cart
                      <AntDesign name="shoppingcart" size={24} color="black" />
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate("Cart", { cart })}
      />

      <Text>Items in Cart: {cart.length}</Text>
    </View>
  );
};

export default HomeScreen;
