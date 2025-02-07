import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={st.backButton}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
};

const st = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default BackButton;
