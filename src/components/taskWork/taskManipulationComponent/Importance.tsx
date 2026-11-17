import { Text, View} from "react-native";
import Checkbox from "expo-checkbox";
import { colors } from "@/styles/colors";

type ImportanceProps = {
  formData: {
    isImportant: number;
  };
  updateForm: (field: string, value: number) => void;
};

export default function Importance({
  formData,
  updateForm,
}: ImportanceProps) {
      
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 }}>
            <Checkbox
                value={formData.isImportant === 1}
                onValueChange={(value) => updateForm("isImportant", value ? 1 : 0)}
                color={formData.isImportant ? colors.primary : undefined}
            />
            <Text>Mark as important</Text>
        </View>
    );
}

