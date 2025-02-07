import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  // Define the structure of the API response
  genres: Genre[];
}

const Genres = () => {
  const { genre } = useLocalSearchParams<{ genre: string }>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.themoviedb.org/3/genre/${genre}/list?language=en`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer ###",
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
  }, [genre]);

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
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()} // Use a unique key
        renderItem={({ item }) => (
          <View style={styles.genreItem}>
            <Text style={styles.genreName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  genreItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  genreName: {
    fontSize: 16,
  },
});
export default Genres;
