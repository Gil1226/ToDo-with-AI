import {View, Pressable, Text, TextInput, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {createTaskStyles} from "@/styles/createTaskStyles";
import {distinctCategory} from "@/database/taskFunction";

type CategoryProps = {
    formData: {
        category: string;
    };
    updateForm: (field: string, value: string) => void;
    showCategoryPicker: boolean;
    setShowCategoryPicker: (value: boolean) => void;
};

export default function Category({ formData, updateForm, showCategoryPicker, setShowCategoryPicker }: CategoryProps) {
    return(
        <>
            <Pressable style={createTaskStyles.row} onPress={() => setShowCategoryPicker(true)}>
                <Ionicons name="pricetag-outline" size={20} color="#8B9A6E" />

                <Text style={createTaskStyles.label}>Category</Text>

                <View style={styles.category}>
                    <Text style={styles.categoryText}>{formData.category || "Select category"}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>

            {showCategoryPicker && (
                <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "white", padding: 15}}>
                        <View style={styles.layoutCategoryChoice}>
                        {distinctCategory().map((category, index) => (
                            
                            <Pressable key={index} onPress={() => {
                                updateForm("category", category);
                                setShowCategoryPicker(false);
                            }}> 
                                <View style={styles.category}>
                                    <Text style={[styles.categoryText]}>{category}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <TextInput placeholder="Add new category..." />
                </View>
            )}
        </>
        
    )
}

const styles = StyleSheet.create({
    category: {
        marginLeft: "auto",
        marginRight: 5,
        backgroundColor: "#8B9A6E",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    categoryText: {
        color: "white",
        fontSize: 11,
        fontWeight: "600",
    },

    layoutCategoryChoice: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
})
