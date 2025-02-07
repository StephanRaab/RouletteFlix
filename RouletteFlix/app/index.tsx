import { Stack, Link } from "expo-router";
import { View, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e50914",
        padding: 20,
      }}
    >
      <Image
        style={{
          position: "absolute",
          right: 100, // Offsets it to the right
          top: -40, // Moves it down from the top
          width: 673,
          height: 673,
          opacity: 0.1,
        }}
        resizeMode="cover"
        source={require("../assets/images/roulette-bg.png")}
      />

      <Stack.Screen
        options={{
          title: "",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
        }}
      />

      <Link href={"/Choices"}>
        <Image
          source={require("../assets/images/RouletteFlix-white-2x.png")}
          style={{ resizeMode: "contain" }}
        />
      </Link>
    </View>
  );
}
