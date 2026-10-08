import {Text, Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {distinctCategory} from "@/database/taskFunction";
import {createTaskStyles} from "@/styles/createTaskStyles";

type TimeProps = {
    formData: {
        time: string;
    };
    updateForm: (field: string, value: string) => void;
    showTimePicker: boolean;
    setShowTimePicker: (value: boolean) => void;
};

export default function Time({formData, updateForm, showTimePicker, setShowTimePicker}: TimeProps) {
    const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
        setShowTimePicker(false);
        if (selectedTime) {
            updateForm("time", selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
    };
    return(
        <>
            <Pressable style={createTaskStyles.row}
                        onPress={() => {
                            setShowTimePicker(true);
                            console.log(distinctCategory());
                        }}>
                <Ionicons name="time-outline" size={20} color="#8B9A6E" />

                <Text style={createTaskStyles.label}>Time</Text>

                <Text style={createTaskStyles.value}>{formData.time || "Select time"}</Text>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>
            {showTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onValueChange={handleTimeChange}
                    onDismiss={() => setShowTimePicker(false)}
                />
            )}
        </>
        
    )
}
const styles = StyleSheet.create({
    
})
