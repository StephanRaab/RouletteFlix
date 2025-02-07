import React from "react";
import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";

interface IconProps {
  width?: number;
  height?: number;
}

interface ButtonProps {
  title: string;
  icon: React.FC<IconProps>;
  onPress: (event: GestureResponderEvent) => void;
}

const SolidButton: React.FC<ButtonProps> = ({ title, icon: Icon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Icon width={20} height={20} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "#b20710", // Solid red background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10, // Space between icon and text
  },
});

export default SolidButton;
