import { useState } from "react";
import {View, Text, TextInput,TouchableOpacity,StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<any> }) {

  const [search, setSearch] = useState("");

  const menuItems = [
    {id: "1", name: "Grilled Chicken Salad", price: "R85"},
    {id: "2", name: "Beef Fillet & Chips", price: "R220"},
    {id: "3", name: "Chocolate Mousse", price: "R65"},
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.screen}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            My Menu
          </Text>
        </View>


        {/* SEARCH */}
        <View style={styles.content}>

          <TextInput
            style={styles.search}
            placeholder="Search menu..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />


          {/* STARTERS */}
          <Text style={styles.sectionTitle}>
            Starters
          </Text>


          {/* MENU ITEMS */}
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (

              <View style={styles.menuItem}>

                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                <Text style={styles.price}>
                  {item.price}
                </Text>

              </View>

            )}
          />


          {/* ADD BUTTON */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Menu")}
          >

            <Text style={styles.addButtonText}>
              Add Menu Item
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  header: {
    height: 105,
    backgroundColor: "#30333F",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  content: {
    flex: 1,
  },

  search: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 2,
  },

  menuItem: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  addButton: {
    height: 55,
    backgroundColor: "#79B9A8",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

});