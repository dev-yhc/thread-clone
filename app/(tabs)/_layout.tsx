import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, usePathname, useRouter } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { Animated, Modal, Pressable, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { AuthContext } from "../_layout";

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
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const ref = useRef<typeof AnimatedTabBarButton>(null);
  const pathname = usePathname();
  
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
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#101010" : "white",
            borderTopWidth: 0,
          },
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
              <Ionicons name="home" color={focused ? colorScheme === "dark" ? "white" : "black" : "gray"} size={24} />
            ),
          }}
        />
        <Tabs.Screen name="search" options={{
          title: "Search",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="search" color={focused ? colorScheme === "dark" ? "white" : "black" : "gray"} size={24} />
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
              <Ionicons name="add" color={focused ? colorScheme === "dark" ? "white" : "black" : "gray"} size={24} />
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
              <Ionicons name="heart-outline" color={focused ? colorScheme === "dark" ? "white" : "black" : "gray"} size={24} />
            ),
          }} />
        <Tabs.Screen name="[username]"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              } else {
                router.navigate(`/@${user.id}`);
              }
            },
          }}
          options={{
            title: "[Username]",
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="person-outline" color={focused && user?.id === pathname?.slice(2) ? colorScheme === "dark" ? "white" : "black" : "gray"} size={24} />
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