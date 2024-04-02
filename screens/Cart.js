import React, { useState, useEffect, useContext } from "react";
import { Button, Text, TextInput, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CartContext } from "../store/cart-context";

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

  return (
    <View>
      <View style={{ height: "90%" }}>
        {cart.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "10%",
            }}
          >
            <Text style={{ width: "20%" }}>{item.name}</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                marginHorizontal: 10,
                paddingHorizontal: 5,
              }}
              value={String(item.quantity)}
              onChangeText={(text) => updateQuantity(index, parseInt(text))}
              keyboardType="numeric"
            />

            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
              onPress={() => removeFromCart(index)}
            >
              <Feather name="trash-2" size={24} color="red" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CartScreen;
