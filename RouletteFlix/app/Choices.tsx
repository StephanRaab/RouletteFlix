import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useEffect, useState } from "react";
import { Stack, Link } from "expo-router";
import SolidButton from "@/assets/buttons/SolidButton";

interface IconProps {
  width?: number;
  height?: number;
}

const TvIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
  </svg>
);

const MovieIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
  </svg>
);

const Choices = () => {
  const [settings, setSettings] = useState("tonight");

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

      <Text
        style={[
          st.headerText,
          {
            display: "flex",
            flex: 1,
            textAlign: "center",
          },
        ]}
      >
        What are you into {settings}?
      </Text>

      <View>
        <Link href={"/genres/tv"}>
          <Button title="TV Show" />
        </Link>
        <Link href={"/genres/movie"}>
          <Button title="Movie" />
        </Link>
        {/* <Link href={"/Genres/tv"}>
          <SolidButton title="TV Shows" icon={TvIcon} onPress={() => {}} />
        </Link>

        <SolidButton title="Movie" icon={MovieIcon} onPress={() => {}} /> */}
      </View>
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
