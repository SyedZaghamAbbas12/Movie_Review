import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: movie.poster }}
          style={{ width: 120, height: 180, borderRadius: 10 }}
        />
        <Text style={{ marginTop: 5, width: 120, textAlign: "center" }}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}