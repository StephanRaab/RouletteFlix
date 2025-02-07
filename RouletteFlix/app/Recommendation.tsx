import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Pressable,
  Modal,
  Image,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { BEARER_TOKEN } from "@/Constants";

const Recommendation = () => {
  const { genreIds, mediaType } = useLocalSearchParams<{
    genreIds: string;
    mediaType: string;
  }>();

  const [mediaList, setMediaList] = useState<any[]>([]);
  const [currentMedia, setCurrentMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (genreIds) {
      const genreIdArray = genreIds.split(",").map(Number);
      const randomGenreId =
        genreIdArray[Math.floor(Math.random() * genreIdArray.length)];
      fetchMedia(randomGenreId);
    }
  }, [genreIds]);

  const fetchMedia = async (genreId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: BEARER_TOKEN,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results.length > 0) {
        setMediaList(data.results);
        setCurrentMedia(
          data.results[Math.floor(Math.random() * data.results.length)]
        );
      } else {
        setCurrentMedia(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSpinAgain = () => {
    if (mediaList.length > 0) {
      const randomIndex = Math.floor(Math.random() * mediaList.length);
      setCurrentMedia(mediaList[randomIndex]);
    }
  };

  const handleThumbnailPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Recommendation",
          headerStyle: { backgroundColor: "#e50914" },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />

      {loading && <ActivityIndicator size="large" color="#e50914" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {!loading && !currentMedia && (
        <Text style={styles.noMovieText}>No movies found</Text>
      )}
      {currentMedia && (
        <>
          <Pressable onPress={handleThumbnailPress}>
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w342${currentMedia.poster_path}`,
              }}
            />
            <Text style={styles.overview}>{currentMedia.overview}</Text>
          </Pressable>
          <Button title="🎰 Spin Again?" onPress={handleSpinAgain} />
        </>
      )}

      {/* Modal for displaying media details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {currentMedia && (
            <>
              <Text style={styles.modalTitle}>{currentMedia.title}</Text>
              <Text style={styles.modalOverview}>{currentMedia.overview}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  overview: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noMovieText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  modalOverview: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default Recommendation;
