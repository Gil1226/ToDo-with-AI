import { View, Pressable, Text, StyleSheet } from "react-native"

type Segment = "active" | "history"

type Props = {
    segment: Segment
    setSegment: (value: Segment) => void
}

const OPTIONS: { key: Segment, label: string }[] = [
  { key: "active", label: "Active" },
  { key: "history", label: "History" },
]

export default function SegmentControl({segment, setSegment}: Props) {

    return(
        <View style={styles.container}> 
            {OPTIONS.map((option) => (
                <Pressable 
                    key={option.key}
                    style={[styles.tab, segment == option.key && styles.selectedTab]}
                    onPress={() => setSegment(option.key)} 
                    accessibilityRole="button"
                    accessibilityState={{ selected: segment === option.key }}   
                >
                    <Text>{option.label}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0EDE4",
        padding: 4,
        borderRadius: 999,
        gap: 4,
        width: "100%",
        marginBottom: 20
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 999,
    },
    selectedTab: {
        backgroundColor: "#91A17A",
    },
})