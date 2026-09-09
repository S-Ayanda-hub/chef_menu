import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


export default function Menu({ navigation }: { navigation: NativeStackNavigationProp<any> }) {

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starters");
  const [price, setPrice] = useState("");


  const addItem = () => {

    if (
      dishName.trim() === "" ||
      description.trim() === "" ||
      price.trim() === ""
    ) {

      Alert.alert(
        "Missing information",
        "Please complete all fields."
      );

      return;
    }

    Alert.alert(
      "Item Added",
      `${dishName} has been added to your menu.`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
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

            <Text style={styles.back}>
              {"<"}
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerText}>
            Add Menu Item
          </Text>

        </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* DISH NAME */}

          <Text style={styles.label}>
            Dish Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Grilled Chicken Salad"
            placeholderTextColor="#999"
            value={dishName}
            onChangeText={setDishName}
          />


          {/* DESCRIPTION */}

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.description
            ]}
            placeholder="Enter a description of the dish..."
            placeholderTextColor="#999"
            multiline={true}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />


          {/* COURSE */}

          <Text style={styles.label}>
            Course
          </Text>

          <View style={styles.pickerBox}>

            <Picker
              selectedValue={course}
              onValueChange={(itemValue) =>
                setCourse(itemValue)
              }
              style={styles.picker}
            >

              <Picker.Item
                label="Starters"
                value="Starters"
              />

              <Picker.Item
                label="Main Course"
                value="Main Course"
              />

              <Picker.Item
                label="Desserts"
                value="Desserts"
              />

              <Picker.Item
                label="Drinks"
                value="Drinks"
              />

            </Picker>

          </View>


          {/* PRICE */}

          <Text style={styles.label}>
            Price (R)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="85"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />


          {/* ADD ITEM */}

          <TouchableOpacity
            style={styles.addButton}
            onPress={addItem}
          >

            <Text style={styles.addButtonText}>
              Add Item
            </Text>

          </TouchableOpacity>

        </ScrollView>

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
    marginTop: 15,
    marginBottom: 25,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 55,
    height: 105,
    justifyContent: "center",
    alignItems: "center",
  },

  back: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "400",
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
  },

  content: {
    paddingBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
  },

  description: {
    height: 105,
    paddingTop: 12,
  },

  pickerBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    marginBottom: 14,
    justifyContent: "center",
  },

  picker: {
    height: 50,
    width: "100%",
    color: "#555555",
  },

  addButton: {
    height: 55,
    backgroundColor: "#79B9A8",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

});