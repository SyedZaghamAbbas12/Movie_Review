import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import * as Progress from "react-native-progress";

export default function Rating({ route }) {
  const { movie } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://10.113.74.18:5000/api/reviews/${movie}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff" }}>Loading ratings...</Text>
      </View>
    );
  }

  // Convert string % to number (for progress)
  const positive = Number(data.positive) / 100;
  const negative = Number(data.negative) / 100;
  const neutral = Number(data.neutral) / 100;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{movie}</Text>

        {/* Positive */}
        <Text style={styles.label}>😊 Positive ({data.positive}%)</Text>
        <Progress.Bar progress={positive} width={null} color="#00e676" />

        {/* Negative */}
        <Text style={styles.label}>😡 Negative ({data.negative}%)</Text>
        <Progress.Bar progress={negative} width={null} color="#ff1744" />

        {/* Neutral */}
        <Text style={styles.label}>😐 Neutral ({data.neutral}%)</Text>
        <Progress.Bar progress={neutral} width={null} color="#9e9e9e" />
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
  loader: {
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
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
});