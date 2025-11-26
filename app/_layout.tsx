import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  description: string;
  profileImageUrl: string;
}

export const AuthContext = createContext<{
  user: User | null;
  login?: () => Promise<any>;
  logout?: () => Promise<any>;
}>({ user: null });

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const login = async () => {
    await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    })
    .then(async (res) => {
      if(res.status >= 400) {
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      setUser(data.user);
      await Promise.all([
        SecureStore.setItemAsync("accessToken", data.accessToken),
        SecureStore.setItemAsync("refreshToken", data.refreshToken),
        AsyncStorage.setItem("user", JSON.stringify(data.user)),
      ]);
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
  };

  const logout = async () => {
    setUser(null);
    await Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if(user) {
        setUser(user ? JSON.parse(user) : null);
      }
    });
    // TODO: validate access token
  }, []);


  return (
    <AuthContext value={{ user, login, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthContext>
  );
}
