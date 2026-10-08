import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "@/styles/common";
import { useState } from "react";
import {getTodayDate} from "@/utility/date";
import { createTask } from "@/database/taskFunction";
import Title from "@/components/taskWork/createTaskComponent/Title";
import Time from "@/components/taskWork/createTaskComponent/Time";
import DateField from "@/components/taskWork/createTaskComponent/Date";
import Category from "@/components/taskWork/createTaskComponent/Category";

type CreateTaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<any[]>>;
    setShowCreateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateTaskForm({ setTasks, setShowCreateTaskForm }: CreateTaskFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        time: "",
        date: getTodayDate(),
        category: "",
    });

    const updateForm = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    }
    
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    return (
        <View style={styles.overlay}>
            <View style={styles.form}>
                <View style={[styles.header, commonStyles.flexBetween]}>
                    <Text style={styles.title}>New task</Text>

                    <Pressable onPress={() => setShowCreateTaskForm(false)}>
                        <Ionicons name="close" size={22} color="#8B9A6E" />
                    </Pressable>
                </View>

                <Title formData={formData} updateForm={updateForm} />
                <Time formData={formData} updateForm={updateForm} showTimePicker={showTimePicker} setShowTimePicker={setShowTimePicker} />
                <DateField formData={formData} updateForm={updateForm} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} />
                <Category formData={formData} updateForm={updateForm} showCategoryPicker={showCategoryPicker} setShowCategoryPicker={setShowCategoryPicker} />
                
                <Pressable style={styles.saveButton}
                            onPress={() => {
                                createTask(formData.title, formData.time, formData.date, formData.category);
                                setTasks(prevTasks => [...prevTasks, formData]);
                                setShowCreateTaskForm(false);
                            }}
                >
                    <Text style={styles.saveText}>Save task</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(0, 0, 0, 0.15)",
    },

    form: {
        width: "92%",
        backgroundColor: "#F7F3EC",
        borderRadius: 16,
        padding: 15,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 4,
        paddingBottom: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: "700",
        color: "#222",
    },
    saveButton: {
        height: 38,  
        marginTop: 12,
        borderRadius: 12,
        backgroundColor: "#8B9A6E",
        justifyContent: "center",
        alignItems: "center",
    },

    saveText: {
        color: "white",
        fontSize: 14,
        fontWeight: "700",
    },
})