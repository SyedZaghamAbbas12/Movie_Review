import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import movies from "../data/movies";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Movie Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Overlay */}
            <View style={styles.overlay}>
              <Text style={styles.title} numberOfLines={2}>
                {item.name}
              </Text>

              {/* Buttons */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={() =>
                    navigation.navigate("Review", { movie: item.name })
                  }
                >
                  <Text style={styles.btnText}>✍️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={() =>
                    navigation.navigate("Rating", { movie: item.name })
                  }
                >
                  <Text style={styles.btnText}>📊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 5,
  },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
  },

  image: {
    width: "100%",
    height: 220,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff3d00",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});