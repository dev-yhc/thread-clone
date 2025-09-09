import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false }} >
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
          router.navigate("/modal");
        },
      }}
      options={{ title: "Add",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="add" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen name="activity" options={{ title: "Activity",
      tabBarLabel: () => null,
      tabBarIcon: ({ focused }) => (
        <Ionicons name="heart-outline" color={focused ? "black" : "gray"} size={24} />
      ),
    }} />
    <Tabs.Screen name="[username]" options={{ title: "[Username]",
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
  </Tabs>;
}