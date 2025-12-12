import Post, { type Post as PostType } from "@/components/Post";
import { usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

export default function Following() {
  const colorScheme = useColorScheme();
  const path = usePathname();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch(`/posts?type=following`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error(err));
  }, [path]);

  const onEndReached = useCallback(() => {
    fetch(`/posts?type=following&cursor=${posts.at(-1)?.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts.length > 0) {
          setPosts((prev) => [...prev, ...data.posts]);
        }
      });
  }, [posts, path]);

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
});