import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import filter from "../../assets/data/filter.json";

interface Filter {
  name: string;
  count: number;
  checked?: boolean;
}

export default function Filter() {
  const navigation = useNavigation();
  const renderItem: ListRenderItem<Filter> = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList data={filter} renderItem={renderItem} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    // backgroundColor: Colors.primary,
    flex: 1,
    padding: 24,
  },
  footer: {
    position: "absolute",
    // backgroundColor: Colors.medium,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    // elevation: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
