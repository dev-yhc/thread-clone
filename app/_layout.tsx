import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useState } from "react";

export const AuthContext = createContext<{
  user?: object;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}>({})

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const login = () => {
    return fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    })
    .then((res) => {
      if(res.status >= 400) {
        throw new Error("Invalid credentials");
      }
      return res.json();
    })
    .then(data => {
      setUser(data.user);
      return Promise.all([
        SecureStore.setItemAsync("accessToken", data.accessToken),
        SecureStore.setItemAsync("refreshToken", data.refreshToken),
        AsyncStorage.setItem("user", JSON.stringify(data.user)),
      ]);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };


  return (
    <AuthContext value={{ user, login, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthContext>
  );
}
