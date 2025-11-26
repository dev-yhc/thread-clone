import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // TODO: 모달 갔다오면 여러번 찍힘
  // console.log(pathname);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Pressable onPress={() => router.push("/@yhc/post/1")}>
            <Text>게시글1</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/@yhc/post/2")}>
            <Text>게시글2</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/@yhc/post/3")}>
            <Text>게시글3</Text>
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
  menuButton: {
    position: "absolute",
    left: 20,
    top: 0,
  },
});