import { AuthContext } from "@/app/_layout";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <View style={styles.tabBar}>
      <Text>Threads will be here</Text>
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
    top: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profile: {
  },
  profileHeader: {
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#555",
  },
});
