import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Stack, Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import getTimeOfDay from "@/utils/GetTimeOfDay";

const Choices = () => {
  type TimeOfDay = "this morning" | "this afternoon" | "tonight";
  const [settings, setSettings] = useState<TimeOfDay>("this morning");

  useEffect(() => {
    setSettings(getTimeOfDay());
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
          opacity: 0.04,
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
          style={styles.button}
          href={"/genres/tv"}
          accessibilityLabel="Navigate to TV Show genres"
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
          style={styles.button}
          href={"/genres/movie"}
          accessibilityLabel="Navigate to Movie genres"
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
  button: {
    backgroundColor: "#e50914",
    width: "auto",
    borderRadius: 5,
    padding: 10,
  },
  redButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
});
