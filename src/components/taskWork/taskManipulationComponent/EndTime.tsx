import {Text, Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {distinctCategory} from "@/database/taskFunction";
import {createTaskStyles} from "@/styles/createTaskStyles";

type TimeProps = {
    formData: {
        endTime: string;
    };
    updateForm: (field: string, value: string) => void;
    showEndTimePicker: boolean;
    setShowEndTimePicker: (value: boolean) => void;
};

export default function EndTime({formData, updateForm, showEndTimePicker, setShowEndTimePicker}: TimeProps) {
    const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            const hh = String(selectedTime.getHours()).padStart(2, "0");
            const mm = String(selectedTime.getMinutes()).padStart(2, "0");
            updateForm("endTime", `${hh}:${mm}`);
        }
    };
    return(
        <>
            <Pressable style={createTaskStyles.row}
                        onPress={() => {
                            setShowEndTimePicker(true);
                            console.log(distinctCategory());
                        }}>
                <Ionicons name="time-outline" size={20} color="#8B9A6E" />

                <Text style={createTaskStyles.label}>End Time</Text>

                <Text style={createTaskStyles.value}>{formData.endTime || "Select time"}</Text>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>
            {showEndTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onValueChange={handleTimeChange}
                    onDismiss={() => setShowEndTimePicker(false)}
                />
            )}
        </>
        
    )
}
