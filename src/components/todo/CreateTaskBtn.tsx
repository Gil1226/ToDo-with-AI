import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export default function CreateTasksBtn() {
    return(
        <View style={style.container}>
            <Pressable style={style.roundBackground}>
                <Ionicons name="add" style={style.addDesign}></Ionicons>
            </Pressable>
        </View>
    )
    
}

const style = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        bottom: -140
    },
    roundBackground: {
        width: 50,
        height: 50, 
        backgroundColor: colors.primary,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    addDesign: {
        color: "white",
        fontSize: 40,
        
    },
})
