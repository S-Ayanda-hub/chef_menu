import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuContext } from "../App";

const COURSES = ["Starters", "Main Course", "Desserts", "Drinks"];

export default function Details({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const menuContext = useContext(MenuContext);
  if (!menuContext) return null;
  const { menuItems } = menuContext;

  const total = menuItems.length;
  const sum = menuItems.reduce((acc, i) => acc + (parseFloat(i.price) || 0), 0);
  const average = total === 0 ? 0 : sum / total;

  const counts = COURSES.map((c) => ({
    course: c,
    count: menuItems.filter((i) => i.course === c).length,
  }));
  const maxCount = Math.max(1, ...counts.map((c) => c.count));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.back}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Chef's Menu Manager</Text>
        </View>

        <Text style={styles.subHeader}>Menu Statistics</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* TOP STAT CARDS */}
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total Menu Items</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>R{average.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Average Price</Text>
            </View>
          </View>

          {/* ITEMS PER COURSE */}
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Items per Course</Text>

            {counts.map(({ course, count }) => (
              <View key={course} style={styles.barRow}>
                <Text style={styles.barLabel}>{course}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${(count / maxCount) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.barCount}>{count}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footnote}>
            Counts update as menu items are added or removed.
          </Text>

          {/* BACK TO MENU */}
          <TouchableOpacity
            style={styles.backToMenu}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backToMenuText}>Back to Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  screen: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20 },

  header: {
    height: 80,
    backgroundColor: "#313855",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { width: 55, height: 80, justifyContent: "center", alignItems: "center" },
  back: { color: "#FFFFFF", fontSize: 25 },
  headerText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

  subHeader: {
    backgroundColor: "#E8EAF0",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 15,
  },

  content: { paddingBottom: 30 },

  statRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#313855",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  statValue: { fontSize: 26, fontWeight: "800", color: "#313855" },
  statLabel: { fontSize: 11, color: "#666666", marginTop: 4 },

  panel: {
    borderWidth: 1.5,
    borderColor: "#313855",
    borderRadius: 8,
    padding: 14,
  },
  panelTitle: { fontSize: 14, fontWeight: "700", color: "#333333", marginBottom: 12 },

  barRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  barLabel: { width: 90, fontSize: 12, color: "#333333" },
  barTrack: {
    flex: 1,
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: { height: 12, backgroundColor: "#313855", borderRadius: 6 },
  barCount: { width: 28, textAlign: "right", fontSize: 12, fontWeight: "700", color: "#333333" },

  footnote: { fontSize: 10, color: "#888888", marginTop: 10 },

  backToMenu: {
    height: 50,
    borderWidth: 2,
    borderColor: "#313855",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  backToMenuText: { color: "#313855", fontSize: 15, fontWeight: "700" },
});
