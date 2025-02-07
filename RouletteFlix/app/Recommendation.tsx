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
  Dimensions,
} from "react-native";

import { useLocalSearchParams, Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { BEARER_TOKEN } from "@/Constants";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.54; // 54% of screen width to match your 212px on iPhone 12 Pro
const imageHeight = imageWidth * (307 / 212); // Maintains your desired aspect ratio

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
        const randomId = Math.floor(Math.random() * data.results.length);
        setCurrentMedia(data.results[randomId]);
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

      {loading && <ActivityIndicator size="large" color="#e50914" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {!loading && !currentMedia && (
        <Text style={styles.noMovieText}>No movies found</Text>
      )}
      {currentMedia && (
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
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w342${currentMedia.poster_path}`,
              }}
            />
          </Pressable>
          <Text style={styles.whiteBodyText}>Click image for more info</Text>

          <Pressable style={styles.redButton} onPress={handleSpinAgain}>
            <Text style={styles.redButtonText}>🎰 Spin Again?</Text>
          </Pressable>
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
              <Pressable
                style={styles.redButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.redButtonText}>Close</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
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
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  redButtonText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 800,
    color: "white",
  },
  headerText: {
    fontSize: 36,
    fontWeight: 800,
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
    marginBottom: 10,
  },
});

export default Recommendation;

// import { View, Text, Image } from "react-native";
// import React from "react";
// import { Stack } from "expo-router";
// import BackButton from "@/components/BackButton";

// const Recommendation = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//       }}
//     >
//       <Stack.Screen
//         options={{
//           title: "Recommendations",
//           headerStyle: { backgroundColor: "#e50914" },
//           headerShadowVisible: false,
//           headerLeft: () => <BackButton />,
//         }}
//       />
//       <Image
//         resizeMode="contain"
//         style={{ width: 342, height: 342 }}
//         source={{ uri: "https://placehold.co/342" }}
//       />
//       <Text>Recommendation Screen</Text>
//     </View>
//   );
// };

// export default Recommendation;
