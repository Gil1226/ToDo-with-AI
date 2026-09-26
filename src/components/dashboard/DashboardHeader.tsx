import { Text, View, StyleSheet } from "react-native";
import { getFormattedDate } from "@/utility/date";
import { colors } from "@/styles/colors";

export default function DashboardHeader() {
    const name: string = "Gils";
    const formattedDate = getFormattedDate()

    return (
        <View style={styles.container}>
            <Text style={styles.date}>
                {formattedDate}
            </Text>

            <Text style={styles.title}>
                Good morning, {name} 👋
            </Text>

            <Text style={styles.subtitle}>
                Here's what you have planned for today.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        marginBottom: 32,
        marginTop: 8,
    },

    date: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.fontLight,
        marginBottom: 4,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        letterSpacing: -0.5,
        color: colors.fontDark,
    },

    subtitle: {
        fontSize: 16,
        color: colors.fontLight,
        marginTop: 8,
    },
});