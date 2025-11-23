import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  ref,
  ...restProps
}: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 100
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 100
      })
    ]).start();
  };

  return (
    <Pressable
      {...restProps}
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style
      ]}
      // disable android ripple effect
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function TabsLayout() {
  const router = useRouter();
  const isLoggedIn = false;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const ref = useRef<typeof AnimatedTabBarButton>(null);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toLoginPage = () => {
    closeLoginModal();
    router.navigate("/login");
  };

  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
        }}
        ref={ref}
        >
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
        <Tabs.Screen name="search" options={{
          title: "Search",
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
          options={{
            title: "Add",
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
          options={{
            title: "Activity",
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
          options={{
            title: "[Username]",
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
            <Pressable onPress={toLoginPage}>
              <Text>Login</Text>
            </Pressable>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}