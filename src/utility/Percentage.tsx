import Svg, { Circle } from "react-native-svg";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "@/styles/colors";


type TaskProgressCardProps = {
  completed: number;
  total: number;
};

export default function Percentage({
  completed,
  total,
}: TaskProgressCardProps) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <View>
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <Circle
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />

          <Circle
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>
            {percentage}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },

  percentageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  percentageText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.fontDark,
  },
});