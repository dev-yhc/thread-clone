import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const isLoggedIn = true;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
  <Tabs screenOptions={{ headerShown: false }} >
    <Tabs.Screen
    name="(home)"
    options={{
      title: "Home",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="home" color={focused ? "black" : "gray"} size={24} />
      ),
    }}
    />
    <Tabs.Screen name="search" options={{ title: "Search",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="search" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen name="add"
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          if (isLoggedIn) {
            router.navigate("/modal");
          } else {
            openLoginModal();
          }
        },
      }}
      options={{ title: "Add",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="add" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen name="activity"
      listeners={{
        tabPress: (e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            openLoginModal();
          }
        },
      }}
      options={{ title: "Activity",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="heart-outline" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen name="[username]"
      listeners={{
        tabPress: (e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            openLoginModal();
          }
        },
      }}
      options={{ title: "[Username]",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="person-outline" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen
      name="(post)/[username]/post/[postID]"
        options={{
        tabBarLabel: () => null,
        href: null,
      }}
    />
  </Tabs>
    <Modal
    visible={isLoginModalOpen}
    onRequestClose={closeLoginModal}
    transparent={true}
    animationType="slide"
    >
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <TouchableOpacity onPress={closeLoginModal}>
            <Text>Login Modal</Text>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
  );
}