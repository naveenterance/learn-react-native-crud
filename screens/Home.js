import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const HomeScreen = ({ navigation }) => {
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
      // If the item already exists in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { name: flower, quantity: 1 }]);
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
    // Fetch your list of flowers here
    const fetchFlowers = async () => {
      try {
        // Simulated list of flowers, replace this with your actual API call or data source
        const flowerList = ["Rose", "Lily", "Sunflower", "Tulip", "Daisy"];
        setFlowers(flowerList);
      } catch (error) {
        console.error("Error retrieving flowers:", error);
      }
    };

    fetchFlowers();
  }, []);

  const navigateToCartScreen = () => {
    navigation.navigate("Cart", { cart }); // Pass cart data as a navigation parameter
  };

  return (
    <View>
      {user ? (
        <View>
          <Text>Welcome, {user.name}!</Text>
          <Button title="Logout" onPress={handleLogout} />

          <Text>List of Flowers:</Text>
          {flowers.map((flower, index) => (
            <View key={index}>
              <Text>{flower}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(flower)} />
            </View>
          ))}

          <Button title="Go to Cart" onPress={navigateToCartScreen} />
          <Text>Items in Cart: {cart.length}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
