import NotFound from "@/app/+not-found";
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/quotes",
      "/activity/reposts",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }

  return (
    <View
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>

      <View>
        <View style={styles.tabBar}>
          <Pressable onPress={() => router.push("/activity")}>
            <Text>All</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/activity/follows")}>
            <Text>Follows</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/activity/replies")}>
            <Text>Replies</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/activity/quotes")}>
            <Text>Quotes</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/activity/reposts")}>
            <Text>Reposts</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/activity/verified")}>
            <Text>Verified</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 0,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});