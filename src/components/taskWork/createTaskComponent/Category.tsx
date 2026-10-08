import {View, Pressable, Text, TextInput, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {createTaskStyles} from "@/styles/createTaskStyles";
import {distinctCategory} from "@/database/taskFunction";
import { useState } from "react";

type CategoryProps = {
    formData: {
        category: string;
    };
    updateForm: (field: string, value: string) => void;
    showCategoryPicker: boolean;
    setShowCategoryPicker: (value: boolean) => void;
};

export default function Category({ formData, updateForm, showCategoryPicker, setShowCategoryPicker }: CategoryProps) {

    const [newCategory, setNewCategory] = useState("");

    const showCategoryPickerHandler = () => {
        setShowCategoryPicker(!showCategoryPicker);
    }
    return(
        <>
            <Pressable style={createTaskStyles.row} onPress={showCategoryPickerHandler}>
                <Ionicons name="pricetag-outline" size={20} color="#8B9A6E" />

                <Text style={createTaskStyles.label}>Category</Text>

                <View style={styles.category}>
                    <Text style={styles.categoryText}>{formData.category || "Select category"}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>

            {showCategoryPicker && (
                <View style={{backgroundColor: "white", padding: 15}}>
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
                    <View style={styles.newCategoryContainer}>
                        <TextInput 
                            value={newCategory}
                            onChangeText={setNewCategory}
                            placeholder="Add new category..." style={styles.newCategoryInput} />
                        <Pressable onPress={() => {
                                updateForm("category", newCategory);
                                setShowCategoryPicker(false);
                                setNewCategory("");
                        }}>
                            <View style={ styles.addCategoryButton}>
                                <Text style={styles.saveText}>Add Category</Text>
                            </View>
                        </Pressable>
                    </View>
                    
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
        overflowX: "scroll",
    },

    newCategoryContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
    },

    newCategoryInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 12,
        width: "70%",
    },

    addCategoryButton: {
        height: 41,  
        marginTop: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 0,
        backgroundColor: "#8B9A6E",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    saveText: {
        color: "white",
        fontSize: 12,
        fontWeight: "700",
    },
})
