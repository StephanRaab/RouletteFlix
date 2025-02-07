import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";

const Choices = () => {
  const [settings, setSettings] = useState("tonight");

  return (
    <View style={st.container}>
      <Stack.Screen
        options={{
          title: "Pick Your Poison",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
        }}
      />

      <Image
        style={st.logo}
        source={require("../assets/images/RouletteFlix-red-2x.png")}
      />

      <Text style={[st.headerText]}>What are you into {settings}</Text>
    </View>
  );
};

export default Choices;

const st = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#121212",
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    marginTop: -5,
    width: "100%",
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 36,
    fontWeight: 800,
    color: "#FFFFFF",
  },
});
