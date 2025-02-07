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
