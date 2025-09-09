import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>For You</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/following")}>
        <Text>Following</Text>
      </TouchableOpacity>
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
  );
}
