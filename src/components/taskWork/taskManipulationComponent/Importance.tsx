import { Text, View} from "react-native";
import Checkbox from "expo-checkbox";
import { colors } from "@/styles/colors";

type ImportanceProps = {
  formData: {
    isImportant: boolean;
  };
  updateForm: (field: string, value: boolean) => void;
};

export default function Importance({
  formData,
  updateForm,
}: ImportanceProps) {
      
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 }}>
            <Checkbox
                value={formData.isImportant}
                onValueChange={(value) => updateForm("isImportant", value)}
                color={formData.isImportant ? colors.primary : undefined}
            />
            <Text>Mark as important</Text>
        </View>
    );
}

