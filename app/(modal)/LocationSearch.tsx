import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// console.log(`ENV KEY:  ${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`);

export default function LocationSearch() {
  const navigation = useNavigation();
  // console.log(`ENV KEY:  ${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`);

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
      />
      {/* <Text>LocationSearch</Text> */}
      <MapView style={styles.map} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
