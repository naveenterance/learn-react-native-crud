import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [updatedCart, setUpdatedCart] = useState(
    cart.map((item) => ({ ...item }))
  );

  const updateQuantity = (index, quantity) => {
    const newCart = [...updatedCart];
    newCart[index].quantity = quantity;
    setUpdatedCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...updatedCart];
    newCart.splice(index, 1);
    setUpdatedCart(newCart);
  };

  const goBackWithUpdatedCart = () => {
    navigation.navigate("Home", { updatedCart });
  };

  return (
    <View>
      <View style={{ height: "90%" }}>
        {updatedCart.map((item, index) => (
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
      <Button title="Go back" onPress={goBackWithUpdatedCart} />
    </View>
  );
};

export default CartScreen;
