import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuContext } from "../App";

export default function Edit({ navigation, route }: NativeStackScreenProps<any>) {
  const menuContext = useContext(MenuContext);

  const itemId: string | undefined = route.params?.itemId;
  const existing = menuContext?.menuItems.find((i) => i.id === itemId);
  const isEdit = !!existing;

  const [dishName, setDishName] = useState(existing?.name ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [course, setCourse] = useState(existing?.course ?? "Starters");
  const [price, setPrice] = useState(existing?.price ?? "");
  const [submitted, setSubmitted] = useState(false);

  if (!menuContext) return null;
  const { setMenuItems } = menuContext;

  const nameError = dishName.trim() === "" ? "Error: dish name is required" : "";
  const descError =
    description.trim().length < 12
      ? "Error: description must be 12 characters or more"
      : "";
  const priceNumber = Number(price);
  const priceError =
    price.trim() === "" || isNaN(priceNumber) || priceNumber <= 0
      ? "Error: price must be a number"
      : "";

  const handleSave = () => {
    setSubmitted(true);
    if (nameError || descError || priceError) return;

    const cleaned = {
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: priceNumber.toFixed(2),
    };

    if (isEdit && existing) {
      setMenuItems((items) =>
        items.map((i) => (i.id === existing.id ? { ...i, ...cleaned } : i))
      );
    } else {
      setMenuItems((items) => [
        ...items,
        { id: Date.now().toString(), ...cleaned },
      ]);
    }

    Alert.alert(
      isEdit ? "Item Updated" : "Item Added",
      `${cleaned.name} has been ${isEdit ? "updated" : "added to your menu"}.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const handleDelete = () => {
    if (!existing) return;
    Alert.alert(
      "Delete item?",
      `Are you sure you want to delete "${existing.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMenuItems((items) => items.filter((i) => i.id !== existing.id));
            navigation.goBack();
          },
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
            <Text style={styles.back}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Chef's Menu Manager</Text>
        </View>

        <Text style={styles.subHeader}>Add / Edit Menu Item</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* DISH NAME */}
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={[styles.input, submitted && !!nameError && styles.inputError]}
            value={dishName}
            onChangeText={setDishName}
          />
          {submitted && !!nameError && (
            <Text style={styles.error}>{nameError}</Text>
          )}

          {/* DESCRIPTION */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.description,
              submitted && !!descError && styles.inputError,
            ]}
            placeholder="Short description of the dish..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
          {submitted && !!descError && (
            <Text style={styles.error}>{descError}</Text>
          )}

          {/* COURSE + PRICE (side by side) */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={course}
                  onValueChange={(v) => setCourse(v)}
                  style={styles.picker}
                >
                  <Picker.Item label="Starters" value="Starters" />
                  <Picker.Item label="Main Course" value="Main Course" />
                  <Picker.Item label="Desserts" value="Desserts" />
                  <Picker.Item label="Drinks" value="Drinks" />
                </Picker>
              </View>
            </View>

            <View style={styles.rowRight}>
              <Text style={styles.label}>Price (R)</Text>
              <TextInput
                style={[
                  styles.input,
                  submitted && !!priceError && styles.inputError,
                ]}
                placeholder="85.00"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>
          {submitted && !!priceError && (
            <Text style={styles.error}>{priceError}</Text>
          )}

          {/* SAVE */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          {/* DELETE */}
          {isEdit && (
            <>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Delete Item</Text>
              </TouchableOpacity>
              
            </>
          )}
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
  backButton: {
    width: 55,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
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

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  inputError: { borderColor: "#C0392B" },
  description: { height: 100, paddingTop: 12 },
  error: { color: "#C0392B", fontSize: 11, marginTop: 4 },

  row: { flexDirection: "row", gap: 12 },
  rowLeft: { flex: 1 },
  rowRight: { flex: 1 },
  pickerBox: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 4,
    justifyContent: "center",
  },
  picker: { height: 48, width: "100%", color: "#555555" },

  saveButton: {
    height: 55,
    backgroundColor: "#110246",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  deleteButton: {
    height: 50,
    borderWidth: 2,
    borderColor: "#C0392B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  deleteButtonText: { color: "#313855", fontSize: 15, fontWeight: "700" },
  hint: { fontSize: 10, color: "#888888", marginTop: 4 },
});
