import {useContext, useState } from "react";
import {View, Text, TextInput,TouchableOpacity,StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { MenuContext } from "../App";

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<any> }) {

  const [search, setSearch] = useState("");
  const menuContext = useContext(MenuContext);
  if(!menuContext) {
    return null;
  }

  const menuItems = menuContext.menuItems;


  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.screen}>

        <View style={styles.header}>
          <Text style={styles.headerText}>
            My Menu
          </Text>
        </View>

        <View style={styles.content}>

          <TextInput
            style={styles.search}
            placeholder="Search menu..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />

          <Text style={styles.sectionTitle}>
            Menu List
          </Text>

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
                  R{item.price}
                </Text>

              </View>

            )}
          />

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
    backgroundColor: "#313855",
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