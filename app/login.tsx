import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  const handleLogin = () => {
    fetch("/login", {
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
      return Promise.all([
        SecureStore.setItemAsync("accessToken", data.accessToken),
        SecureStore.setItemAsync("refreshToken", data.refreshToken),
        AsyncStorage.setItem("user", JSON.stringify(data.user)),
      ]);
    })
    .then(() => {
      router.push("/(tabs)");
    })
    .catch(error => {
      console.error(error);
    });
  };

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ paddingTop: insets.top}}>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
  },
});