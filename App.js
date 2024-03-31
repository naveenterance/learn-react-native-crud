import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import SignUpScreen from "./screens/Signup";
import Welcome from "./screens/Welcome";
import CartScreen from "./screens/Cart";

const Stack = createStackNavigator();

const App = () => {
  const screenOptions = {
    headerTitleAlign: "center", // Aligns the header title to center
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={screenOptions}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: "Sign Up",
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "fleuriste",
            headerLeft: null, // Hide the back button for Home screen
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerTitle: "Cart",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
