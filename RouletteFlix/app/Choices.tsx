import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Stack, Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";

const Choices = () => {
  const [settings, setSettings] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeInHours = now.getHours();
    if (timeInHours < 12) {
      setSettings("this morning");
    } else if (timeInHours >= 12 && timeInHours <= 17) {
      setSettings("this afternoon");
    } else {
      setSettings("tonight");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Pick Your Poison",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />

      <Image
        style={{
          position: "absolute",
          left: 100,
          top: -40,
          width: 673,
          height: 673,
          opacity: 0.06,
        }}
        resizeMode="cover"
        source={require("../assets/images/roulette-bg.png")}
      />

      <Image
        style={styles.logo}
        source={require("../assets/images/RouletteFlix-red-2x.png")}
      />

      <Text
        style={[
          styles.headerText,
          {
            textAlign: "center",
          },
        ]}
      >
        What are you into {settings}?
      </Text>

      <View
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Link
          style={{
            backgroundColor: "#e50914",
            width: "auto",
            borderRadius: 5,
            padding: 10,
          }}
          href={"/genres/tv"}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="tv-outline"
              size={24}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.redButtonText}>TV Show</Text>
          </View>
        </Link>
        <Link
          style={{
            backgroundColor: "#e50914",
            width: "auto",
            padding: 10,
            borderRadius: 5,
          }}
          href={"/genres/movie"}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="film-outline"
              size={24}
              color="white"
            />
            <Text style={styles.redButtonText}>Movie</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default Choices;

const styles = StyleSheet.create({
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
  redButton: {
    backgroundColor: "#e50914",
    width: "80%",
    padding: 8,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: "center",
  },
  redButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
});
