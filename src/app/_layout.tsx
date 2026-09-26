import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { TaskProvider } from "../context/taskContext";

export default function TabLayout() {
  useEffect(() => {
  //createTask("Study React Native", "20:00", "2026-09-26", "Programming");

  //createTask("Go to the gym", "17:00", "2026-09-26", "Fitness");

  //createTask("Read a book", "21:00", "2026-10-22", "Personal");

  //createTask("Finish project", "14:00", "2026-10-22", "School");
  }, [])
  return (
    <TaskProvider>
      <Tabs
        screenOptions={{
          headerShown: true,

          headerLargeTitle: true,

          headerLargeTitleStyle: {
            fontSize: 34,
            fontWeight: "800",
            color: "#8B9A6E",
          },

          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "700",
            color: "#8B9A6E",
          },

          headerTintColor: "#8B9A6E",

          headerStyle: {
            backgroundColor: "#EAE2D6",
          },

          headerShadowVisible: false,

          tabBarActiveTintColor: "#8B9A6E",
          tabBarInactiveTintColor: "#9CA3AF",

          tabBarStyle: {
            height: 72,
            paddingTop: 6,
            paddingBottom: 8,

            backgroundColor: "#EAE2D6",

            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",

            elevation: 0,
            shadowOpacity: 0,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 2,
          },

          tabBarIconStyle: {
            marginBottom: 0,
          },
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",

            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={23}
                color={color}
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="todo"
          options={{
            title: "To-Do",

            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused
                    ? "checkmark-circle"
                    : "checkmark-circle-outline"
                }
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
    
  );
}