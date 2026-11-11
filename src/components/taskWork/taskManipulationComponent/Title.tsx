import {View, TextInput, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";


type TitleProps = {
    formData: {
        title: string;
    };
    updateForm: (field: string, value: string) => void;
};

export default function Title({formData, updateForm}: TitleProps) {
    return(
        <View style={styles.inputContainer}>
            <Ionicons name="pencil-outline" size={19} color="#8B9A6E" />

            <TextInput
                placeholder="Task title"
                placeholderTextColor="#888"
                style={styles.input}
                value={formData.title}
                onChangeText={(value) => updateForm("title", value)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#DED8CC",

        paddingHorizontal: 14,
    },
    input: {
        flex: 1,
        marginLeft: 12,

        fontSize: 14,
        color: "#222",
    },
})
