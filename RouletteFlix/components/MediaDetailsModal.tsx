// components/MediaDetailsModal.tsx
import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

interface MediaDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  media: {
    title: string;
    overview: string;
  } | null;
}

const MediaDetailsModal = ({
  visible,
  onClose,
  media,
}: MediaDetailsModalProps) => {
  if (!media) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{media.title}</Text>
        <Text style={styles.modalOverview}>{media.overview}</Text>
        <Pressable style={styles.redButton} onPress={onClose}>
          <Text style={styles.redButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: "800",
    color: "white",
  },
});

export default MediaDetailsModal;
