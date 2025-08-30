import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";


export default function Modal() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Text>Modal</Text>
            <Pressable onPress={() => router.replace("/(tabs)")}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    );
}