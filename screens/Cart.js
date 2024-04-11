import React, { useState, useContext } from "react";
import { Button, Text, TextInput, View, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CartContext } from "../store/cart-context";
import { flowers_slide } from "../store/flowers";
import { ScrollView } from "react-native-gesture-handler";

const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotalPrice = (itemName, quantity) => {
    const flower = flowers_slide.find((flower) => flower.name === itemName);
    return quantity * parseFloat(flower.price);
  };

  const getTotalCartPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += getTotalPrice(item.name, item.quantity);
    });
    return total;
  };

  return (
    <View>
      <View style={{ height: "90%" }}>
        {cart.map((item, index) => {
          const flower = flowers_slide.find(
            (flower) => flower.name === item.name
          );
          return (
            <ScrollView key={index}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: "10%",
                }}
              >
                <Text style={{ width: "20%", fontSize: 20 }}>{item.name}</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    marginHorizontal: 10,
                    paddingHorizontal: 5,
                    fontSize: 20,
                  }}
                  value={String(item.quantity)}
                  onChangeText={(text) => updateQuantity(index, parseInt(text))}
                  keyboardType="numeric"
                />
                <Text>X</Text>
                <Text style={{ fontSize: 20 }}>
                  ₹ {getTotalPrice(item.name, item.quantity)}
                </Text>
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                  onPress={() => removeFromCart(index)}
                >
                  <Feather name="trash-2" size={24} color="red" />
                </Pressable>
              </View>
            </ScrollView>
          );
        })}
        {cart.length > 0 ? (
          <View>
            <View
              style={{ height: 2, marginTop: "10%", backgroundColor: "black" }}
            />
            <Text style={{ textAlign: "center", marginTop: 10, fontSize: 40 }}>
              Total: ₹ {getTotalCartPrice()}
            </Text>
          </View>
        ) : (
          <Image
            source={require("../assets/cart1.png")}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
    </View>
  );
};

export default CartScreen;
