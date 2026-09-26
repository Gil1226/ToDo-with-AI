import { useState } from "react";
import { ScrollView, View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export default function Category() {
    const categories = ["All", "Work", "Personal", "Errands", "School"];
    const [selected, setSelected] = useState("All")

    const select = (category:string) => {
        setSelected(category)
    }
  return (
    <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {categories.map((category) => {
            const isSelected = selected === category
            return(
                <Pressable 
                    key={category}
                    onPress={() => select(category)}
                    style={[styles.button, isSelected && styles.selectedButton]}
                >
                    <Text>
                        {category}
                    </Text>
                </Pressable>
            )
        })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10
  },
   button: {
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
})