import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import Home from "./src/screens/HomeScreen";
import Review from "./src/screens/Reviewscreen";
import Rating from "./src/screens/RatingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "🎬 Movie App" }}
        />

        {/* Review Screen */}
        <Stack.Screen
          name="Review"
          component={Review}
          options={{ title: "✍️ Write Review" }}
        />

        {/* Rating Screen */}
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{ title: "📊 Ratings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}