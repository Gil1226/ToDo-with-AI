import { ScrollView, View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "@/styles/colors";

export default function SearchBar() {
    const [query, setQuery] = useState("")
    return(
    <View style={styles.searchBar}>
        <Ionicons
            name="search-outline"
            size={22}
            color="#899A73"
        />

        <TextInput
            style={styles.input}
            placeholder="Search tasks..."
            placeholderTextColor="#929292"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
        />

        {query.length > 0 && (
        <Pressable onPress={() => setQuery("")}>
            <Ionicons
                name="close-circle"
                size={21}
                color="#A5A5A5"
            />
        </Pressable>
        )}
    </View>
    )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 10
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222222",
    paddingVertical: 0,
  },
})