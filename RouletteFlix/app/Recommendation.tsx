import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
} from "react-native";

import { useLocalSearchParams, Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { BEARER_TOKEN } from "@/Constants";
import MediaDetailsModal from "@/components/MediaDetailsModal";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.54;
const imageHeight = imageWidth * (307 / 212);

interface Media {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
}

const Recommendation = () => {
  const { genreIds, mediaType } = useLocalSearchParams<{
    genreIds: string;
    mediaType: string;
  }>();

  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [currentMedia, setCurrentMedia] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (
      genreIds &&
      genreIds.length > 0 &&
      (mediaType === "movie" || mediaType === "tv")
    ) {
      const genreIdArray = genreIds.split(",").map(Number);
      if (genreIdArray.length > 0) {
        const randomGenreId =
          genreIdArray[Math.floor(Math.random() * genreIdArray.length)];
        fetchMedia(randomGenreId);
      }
    }
  }, [genreIds, mediaType]);

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
        setCurrentMedia(Math.floor(Math.random() * data.results.length));
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
      setCurrentMedia(randomIndex);
    }
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

      {loading && <ActivityIndicator size="large" color="#e50914" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {!loading && currentMedia === null && (
        <Text style={styles.noMovieText}>No movies found</Text>
      )}
      {currentMedia !== null && mediaList[currentMedia] && (
        <>
          <Text
            style={[
              styles.headerText,
              {
                textAlign: "center",
                marginBottom: 30,
              },
            ]}
          >
            The Wheel has Spoken!
          </Text>
          <Pressable
            onPress={() => {
              if (currentMedia !== null && mediaList[currentMedia]) {
                setModalVisible(true);
              }
            }}
          >
            <Image
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w342${mediaList[currentMedia].poster_path}`,
              }}
            />
          </Pressable>
          <Text style={styles.whiteBodyText}>Click image for more info</Text>

          <Pressable style={styles.redButton} onPress={handleSpinAgain}>
            <Text style={styles.redButtonText}>🎰 Spin Again?</Text>
          </Pressable>
        </>
      )}

      <MediaDetailsModal
        mediaType={mediaType}
        visible={modalVisible && currentMedia !== null}
        onClose={() => setModalVisible(false)}
        media={mediaList[currentMedia!]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBodyText: {
    color: "white",
    padding: 5,
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
    fontWeight: "bold",
    color: "white",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noMovieText: {
    color: "white",
    fontSize: 16,
  },
});

export default Recommendation;
