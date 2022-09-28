import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppForm from "./app/components/AppForm";
import inventory from "./app/components/inventory";
import InventoryText from "./app/components/InventoryText";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={AppForm} name="Нэвтрэх" />
          <Stack.Screen component={inventory} name="inventory" />
          <Stack.Screen component={InventoryText} name="InventoryText" />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
