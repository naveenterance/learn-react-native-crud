import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

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

  return (
    <View>
      <Text>Cart Screen</Text>
      <View>
        <Text>Items in Cart:</Text>
        {updatedCart.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text>{item.name}</Text>
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
            <Button title="Remove" onPress={() => removeFromCart(index)} />
          </View>
        ))}
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CartScreen;
