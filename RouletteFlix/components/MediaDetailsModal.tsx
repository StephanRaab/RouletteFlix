import { BEARER_TOKEN } from "@/Constants";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Chip } from "react-native-paper";

interface MediaDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  mediaType: string;
  media: {
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    vote_average: number;
  } | null;
}

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.33; // 33% of screen width to match my 212px on iPhone 12 Pro
const imageHeight = imageWidth * (307 / 212); // the ratio I wanted

interface Genre {
  id: number;
  name: string;
}

const MediaDetailsModal = ({
  visible,
  onClose,
  media,
  mediaType,
}: MediaDetailsModalProps) => {
  const [genreNames, setGenreNames] = useState<{ [id: number]: string }>({});
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    const fetchGenreNames = async () => {
      if (
        media &&
        media.genre_ids &&
        media.genre_ids.length > 0 &&
        (mediaType === "movie" || mediaType === "tv")
      ) {
        setLoadingGenres(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en-US`,
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
          const names: { [id: number]: string } = {};
          media.genre_ids.forEach((genreId) => {
            const genre = data.genres.find((g: Genre) => g.id === genreId);
            names[genreId] = genre?.name || "Genre name not found";
          });
          setGenreNames(names);
        } catch (error) {
          console.error("Error fetching genre names:", error);
        } finally {
          setLoadingGenres(false);
        }
      }
    };

    fetchGenreNames();
  }, [media, mediaType]);

  if (!media) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.modalTitle}>{media.title || media.name}</Text>
            <Text numberOfLines={20} style={styles.modalOverview}>
              {media.overview}
            </Text>

            <Text style={[styles.whiteSubHeading, { marginTop: 10 }]}>
              Rating
            </Text>
            <Text style={styles.whiteBodyText}>⭐ {media.vote_average}/10</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w342${media.poster_path}`,
              }}
              onError={() => console.error("Image loading error")}
            />
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.whiteSubHeading,
              { alignSelf: "flex-end", marginTop: 15, marginRight: 4 },
            ]}
          >
            Genres
          </Text>
          <View style={styles.chipContainer}>
            {loadingGenres ? (
              <ActivityIndicator size="large" color="#e50914" />
            ) : (
              media.genre_ids.map((genreId) => (
                <Chip key={genreId} style={styles.chip}>
                  {genreNames[genreId] || "Loading..."}
                </Chip>
              ))
            )}
          </View>
        </View>

        <Pressable style={styles.redButton} onPress={onClose}>
          <Text style={styles.redButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  whiteSubHeading: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteBodyText: {
    color: "white",
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    maxWidth: screenWidth * 0.6,
  },
  modalOverview: {
    fontSize: 14,
    color: "white",
    width: 175,
    marginRight: 20,
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
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  chip: {
    backgroundColor: "white",
    margin: 4,
  },
});

export default MediaDetailsModal;
