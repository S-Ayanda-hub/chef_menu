import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuContext } from "../App";

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<any> }) {

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    return null;
  }

  const { menuItems } = menuContext;

  const filteredItems = menuItems.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCourse = courseFilter === "All Courses" || item.course === courseFilter;
    return matchesName && matchesCourse;
  });

  const clearFilters = () => {
    setSearch("");
    setCourseFilter("All Courses");
  };

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
          <View>
            <Text style={styles.headerText}>Chef's Menu Manager</Text>
            <Text style={styles.headerSub}>Restaurant menu made simple</Text>
          </View>
        </View>

        {/* SEARCH + CLEAR */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            placeholder="Search by dish name"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* COURSE FILTER */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={courseFilter}
            onValueChange={(v) => setCourseFilter(v)}
            style={styles.picker}
          >
            <Picker.Item label="Course: All Courses" value="All Courses" />
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Desserts" value="Desserts" />
            <Picker.Item label="Drinks" value="Drinks" />
          </Picker>
        </View>

        <Text style={styles.optionsText}>
          Options: All | Starter | Main Course | Dessert
        </Text>
        <Text style={styles.countText}>
          {filteredItems.length} menu item{filteredItems.length === 1 ? "" : "s"} shown
        </Text>

        {/* LIST */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 10 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Empty state: "No items match your search". Clear the search or add a
              new item.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Edit", { itemId: item.id })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.course}</Text>
                </View>
                <Text style={styles.desc} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Edit")}
        >
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </TouchableOpacity>
        {/* DETAILS BUTTON */}
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => navigation.navigate("Details")}
        >
          <Text style={styles.statsButtonText}>Menu Statistics</Text>
        </TouchableOpacity>
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
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { width: 55, height: 80, justifyContent: "center", alignItems: "center" },
  back: { color: "#FFFFFF", fontSize: 25 },
  headerText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "#C9CCD8", fontSize: 11, marginTop: 2 },

  searchRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  search: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: "#313855",
    borderRadius: 6,
    justifyContent: "center",
    backgroundColor: "#E8EAF0",
  },
  clearText: { color: "#313855", fontWeight: "700", fontSize: 13 },

  pickerBox: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 6,
    justifyContent: "center",
  },
  picker: { height: 48, width: "100%", color: "#333333" },

  optionsText: { fontSize: 10, color: "#888888", marginTop: 6 },
  countText: { fontSize: 13, fontWeight: "700", color: "#333333", marginTop: 10, marginBottom: 8 },

  list: { flex: 1 },
  card: {
    borderWidth: 1.5,
    borderColor: "#313855",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  itemName: { fontSize: 14, fontWeight: "700", color: "#333333", flex: 1 },
  price: { fontSize: 14, fontWeight: "800", color: "#313855" },
  cardBottom: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  badge: {
    borderWidth: 1,
    borderColor: "#313855",
    backgroundColor: "#E8EAF0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 10, color: "#313855", fontWeight: "600" },
  desc: { flex: 1, fontSize: 11, color: "#777777" },

  empty: { fontSize: 12, color: "#888888", marginTop: 20, textAlign: "center" },

  addButton: {
    height: 55,
    backgroundColor: "#110246",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  statsButton: {
  height: 50,
  borderWidth: 2,
  borderColor: "#313855",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
},
statsButtonText: { color: "#313855", fontSize: 15, fontWeight: "700" },
});
