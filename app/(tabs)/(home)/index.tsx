import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../_layout";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  // TODO: 모달 갔다오면 여러번 찍힘
  console.log(pathname);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <BlurView style={styles.header} intensity={70}>
        <Image source={require("@/assets/images/react-logo.png")} style={styles.headerLogo} />
        {!isLoggedIn && (
          <TouchableOpacity onPress={() => router.navigate("/login")} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </BlurView>
      {isLoggedIn && (
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={{ color: pathname === "/" ? "red" : "black" }}>For You</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => router.push("/following")}>
            <Text style={{ color: pathname === "/" ? "black" : "red" }}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => router.push("/@yhc/post/1")}>
            <Text>게시글1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/@yhc/post/2")}>
            <Text>게시글2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/@yhc/post/3")}>
            <Text>게시글3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  loginButton: {
    position: "absolute",
    backgroundColor: "black",
    right: 20,
    top: 0,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  },
});