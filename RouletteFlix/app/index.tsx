import { Stack, Link } from "expo-router";
import { View, Image, StyleSheet, Text } from "react-native";

function Index() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          right: 100,
          top: -40,
          opacity: 0.06,
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

      <Image
        source={require("../assets/images/RouletteFlix-white-2x.png")}
        style={styles.logo}
      />

      <Link style={styles.blackButton} href={"/Choices"}>
        <Text style={styles.blackButtonText}>🍿 Start the Show</Text>
      </Link>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e50914",
    padding: 20,
  },
  logo: {
    marginTop: -5,
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 36,
    fontWeight: 800,
    color: "#FFFFFF",
  },
  blackButton: {
    backgroundColor: "black",
    width: "80%",
    padding: 8,
    borderRadius: 5,
    marginTop: 15,
  },
  blackButtonText: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
});
