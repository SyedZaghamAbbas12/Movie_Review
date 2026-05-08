import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function Review({ route }) {
  const { movie } = route.params;

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) {
      alert("Please write a review first");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post("http://10.113.74.18:5000/api/reviews", {
        movie,
        text,
      });

      setResult(res.data.sentiment);
    } catch (error) {
      console.log(error);
      alert("Error connecting to server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{movie}</Text>

        {/* Review Input */}
        <TextInput
          style={styles.input}
          placeholder="Write your review..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>

        {/* Loading */}
        {loading && <ActivityIndicator size="large" color="#000" />}

        {/* Result Box */}
        {result !== "" && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              Sentiment: {result.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#2c2c2c",
    color: "#fff",
    borderRadius: 10,
    padding: 15,
    height: 100,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#ff3d00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#00c853",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});