import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const [cart, setCart] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Login");
  };

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

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const flowerList = ["Rose", "Lily", "Sunflower", "Tulip", "Daisy"];
        setFlowers(flowerList);
      } catch (error) {
        console.error("Error retrieving flowers:", error);
      }
    };

    fetchFlowers();
  }, []);

  useEffect(() => {
    if (route.params?.updatedCart) {
      setCart(route.params.updatedCart);
    }
  }, [route.params?.updatedCart]);

  const navigateToCartScreen = () => {
    navigation.navigate("Cart", { cart });
  };

  if (!user) {
    return null; // Render nothing if user is not available
  }

  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text>List of Flowers:</Text>
      {flowers.map((flower, index) => {
        const cartItem = cart.find((item) => item.name === flower);
        return (
          <View key={index}>
            <Text>{flower}</Text>
            {/* Display the count if the flower is in the cart */}
            {cartItem ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button title="-" onPress={() => decreaseQuantity(flower)} />
                <Text>{cartItem.quantity}</Text>
                <Button title="+" onPress={() => addToCart(flower)} />
              </View>
            ) : (
              <Button title="Add to Cart" onPress={() => addToCart(flower)} />
            )}
          </View>
        );
      })}
      <Button title="Go to Cart" onPress={navigateToCartScreen} />
      <Text>Items in Cart: {cart.length}</Text>
    </View>
  );
};

export default HomeScreen;
