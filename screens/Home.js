import React, { useEffect, useState, useContext } from "react";
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
import { CartContext } from "../store/cart-context";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

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
        updatedCart.splice(existingItemIndex, 1);
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
        setLoading(false);
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

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10%",
          marginBottom: "10%",
          padding: "2%",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            { marginRight: 16 },
          ]}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons name="menu" size={36} color="black" />
        </Pressable>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: "60%", height: "300%" }}
        />
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            { marginBottom: 10 },
          ]}
          onPress={() => navigation.navigate("Cart", { cart })}
        >
          <Text style={button_1.buttonText}>
            <AntDesign name="shoppingcart" size={24} color="black" />
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        <View style={{ marginBottom: "50%" }}>
          {flowers_slide.map((flower, index) => {
            const cartItem = cart.find((item) => item.name === flower.name);
            return (
              <View key={index} style={{ marginTop: "10%" }}>
                <Image source={flower.image} style={{ height: 200 }} />
                <Text style={button_1.buttonText}>{flower.name}</Text>
                {cartItem ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Pressable
                      style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 },
                      ]}
                      onPress={() => decreaseQuantity(flower.name)}
                    >
                      <AntDesign name="minuscircleo" size={36} color="red" />
                    </Pressable>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                      {cartItem.quantity}
                    </Text>

                    <Pressable
                      style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 },
                      ]}
                      onPress={() => addToCart(flower.name)}
                    >
                      <AntDesign name="pluscircleo" size={36} color="teal" />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                    onPress={() => addToCart(flower.name)}
                  >
                    <Text style={[button_1.buttonText, { color: "teal" }]}>
                      Add to Cart
                      <MaterialIcons
                        name="add-shopping-cart"
                        size={24}
                        color="teal"
                      />
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Button title="Go to Cart" onPress={() => navigation.navigate("Cart")} />

      <Text>Items in Cart: {cart.length}</Text>
    </View>
  );
};

export default HomeScreen;
