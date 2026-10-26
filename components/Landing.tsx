import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Landing({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.top}>
          <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Chef's Menu Manager</Text>
          <Text style={styles.tagline}>Plan your menu. Price with confidence.</Text>
          <Text style={styles.courses}>Starter | Main Course | Dessert</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.primaryText}>View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("Edit")}
          >
            <Text style={styles.outlineText}>Add Menu Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("Details")}
          >
            <Text style={styles.outlineText}>Menu Statistics</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Chef's Menu Manager | Portfolio of Evidence
          </Text>
          <Text style={styles.footerText}>Version | 0.9</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  screen: { flex: 1, paddingHorizontal: 30, justifyContent: "space-between" },

  top: { alignItems: "center", marginTop: 70 },
  logo: { width: 130, height: 130, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "800", color: "#313855", textAlign: "center" },
  tagline: { fontSize: 13, color: "#555555", marginTop: 8, textAlign: "center" },
  courses: { fontSize: 12, color: "#888888", marginTop: 6 },

  buttons: { gap: 14 },
  primaryButton: {
    height: 55,
    backgroundColor: "#110246",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  outlineButton: {
    height: 55,
    borderWidth: 2,
    borderColor: "#313855",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  outlineText: { color: "#313855", fontSize: 16, fontWeight: "700" },

  footer: { alignItems: "center", marginBottom: 20, gap: 2 },
  footerText: { fontSize: 10, color: "#999999" },
});
