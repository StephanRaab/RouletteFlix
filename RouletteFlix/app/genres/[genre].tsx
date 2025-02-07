import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Chip } from "react-native-paper";
import Keys from "react-native-keys";

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  // Define the structure of the API response
  genres: Genre[];
}

const Genres = () => {
  const [selectedCount, setSelectedCount] = useState(3);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [settings, setSettings] = useState("");
  const { genre } = useLocalSearchParams<{ genre: string }>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const fetchGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.themoviedb.org/3/genre/${genre}/list?language=en`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: Keys.secureFor("BEARER"),
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: GenreResponse = await response.json();
        setGenres(json.genres || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [genre, settings]);

  if (loading) {
    return (
      <View>
        <Stack.Screen
          options={{
            title: "Pick Your Poison",
            headerStyle: { backgroundColor: "#e50914" },
            headerShadowVisible: false,
          }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Stack.Screen
          options={{
            title: "Pick Your Poison",
            headerStyle: { backgroundColor: "#e50914" },
            headerShadowVisible: false,
          }}
        />
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Pick Your Poison",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
        }}
      />

      <Text
        style={[
          styles.headerText,
          {
            textAlign: "center",
            marginTop: 30,
            marginBottom: 30,
          },
        ]}
      >
        Pick 3 genres that you're interested in {settings}.
      </Text>

      <View style={styles.chipContainer}>
        {genres.map((genre) => (
          <Chip key={genre.id} style={styles.chip} onPress={() => {}}>
            {genre.name}
          </Chip>
        ))}
      </View>

      <Text
        style={{
          alignSelf: "flex-end",
          color: "white",
          marginTop: 20,
          marginRight: 20,
        }}
      >
        {selectedCount}/3 remaining
      </Text>

      <Link
        style={{
          backgroundColor: "#e50914",
          width: "80%",
          padding: 10,
          borderRadius: 5,
          textAlign: "center",
          fontSize: 24,
          fontWeight: 800,
          color: "white",
          marginTop: 20,
          alignSelf: "center",
        }}
        href={"/genres/tv"}
      >
        <Text>🎲 Roulette</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  genreItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  genreName: {
    fontSize: 16,
  },
  container: {
    flex: 1,

    backgroundColor: "#121212",
    paddingLeft: 10,
    paddingRight: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "white",
    margin: 4,
    color: "red",
  },
  headerText: {
    fontSize: 36,
    fontWeight: 800,
    color: "#FFFFFF",
  },
});
export default Genres;
