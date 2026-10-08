import {Pressable, Text, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {createTaskStyles} from "@/styles/createTaskStyles";
import {getTodayDate} from "@/utility/date";


type DateProps = {
    formData: {
        date: string;
    };
    updateForm: (field: string, value: string) => void;
    showDatePicker: boolean;
    setShowDatePicker: (value: boolean) => void;
};

export default function DateField({ formData, updateForm, showDatePicker, setShowDatePicker }: DateProps) {
    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString("en-US");
            updateForm("date", formattedDate);
            console.log("Selected date:", formattedDate, "Today date:", getTodayDate());
        }
    }
    
    return(
        <>
            <Pressable style={createTaskStyles.row} onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar-outline" size={20} color="#8B9A6E" />

                <Text style={createTaskStyles.label}>Date</Text>

                <Text style={createTaskStyles.value}>{formData.date == getTodayDate() ? "Today" : formData.date}</Text>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onValueChange={handleDateChange}
                    onDismiss={() => setShowDatePicker(false)}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    
})
