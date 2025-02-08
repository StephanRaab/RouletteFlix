import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Chip } from "react-native-paper";
import { BEARER_TOKEN } from "../../Constants";
import BackButton from "@/components/BackButton";

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

const Genres = () => {
  const MAX_SELECTED_GENRES = 3;
  const [selectedCount, setSelectedCount] = useState(MAX_SELECTED_GENRES);
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [settings, setSettings] = useState("");
  const { genre } = useLocalSearchParams<{ genre: string }>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [getStartedText, setGetStartedText] = useState("");

  useEffect(() => {
    if (genre !== "movie" && genre !== "tv") {
      setError("Invalid genre type");
      return;
    }

    const now = new Date();
    const timeInHours = now.getHours();
    if (timeInHours < 12) {
      setSettings("this morning");
    } else if (timeInHours >= 12 && timeInHours <= 17) {
      setSettings("this afternoon");
    } else {
      setSettings("tonight");
    }

    setGetStartedText(
      genre === "tv"
        ? `Pick ${MAX_SELECTED_GENRES} TV Show genres.`
        : `Pick ${MAX_SELECTED_GENRES} Movie genres.`
    );

    const fetchGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.themoviedb.org/3/genre/${genre}/list?language=en`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: BEARER_TOKEN,
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

  const handleChipPress = (genre: Genre) => {
    const newSelectedGenres = new Set(selectedGenres);

    if (newSelectedGenres.has(genre.id)) {
      newSelectedGenres.delete(genre.id);
      setSelectedCount(selectedCount + 1);
    } else if (selectedCount > 0) {
      newSelectedGenres.add(genre.id);
      setSelectedCount(selectedCount - 1);
    }

    setSelectedGenres(newSelectedGenres);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: genre.toUpperCase() || "Genres",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />

      <Image
        style={{
          position: "absolute",
          left: 200,
          top: -40,
          width: "100%",
          height: "100%",
          opacity: 0.06,
        }}
        resizeMode="cover"
        source={require("../../assets/images/roulette-bg.png")}
      />

      {loading && <ActivityIndicator size="large" color="#e50914" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {!loading && !error && (
        <>
          <Text style={styles.headerText}>{getStartedText}</Text>

          <View style={styles.chipContainer}>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                style={[
                  styles.chip,
                  selectedGenres.has(genre.id) && styles.selectedChip,
                ]}
                selectedColor={selectedGenres.has(genre.id) ? "white" : "black"}
                onPress={() => handleChipPress(genre)}
                accessibilityLabel={`Select ${genre.name} genre`}
              >
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
            {selectedCount}/{MAX_SELECTED_GENRES} remaining
          </Text>

          <Link
            style={[
              styles.redButton,
              selectedCount !== 0 && styles.disabledButton,
            ]}
            href={{
              pathname: "/Recommendation",
              params: {
                genreIds: Array.from(selectedGenres).join(","),
                mediaType: genre,
              },
            }}
            asChild
            disabled={selectedCount !== 0}
          >
            <Text style={styles.redButtonText}>🎲 Roulette</Text>
          </Link>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  selectedChip: {
    backgroundColor: "red",
    color: "white",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
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
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#555",
    opacity: 0.3,
  },
});

export default Genres;
