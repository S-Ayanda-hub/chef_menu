import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker/typings/Picker";

export default function menu() {
    return (
        <View>
            <View>
            <Text> Add Menu Item </Text>
            </View>
            <Text> Dish Name</Text>
            <TextInput placeholder="eg. Grilled Chicken Salad" />
            <Text> Description </Text>
            <TextInput placeholder="Short description of the dish" />
            <Text> Course </Text>
            <Picker> 
                <Picker.Item label="Starters" value="starters" />
                <Picker.Item label="Main" value="main" />
                <Picker.Item label="Dessert" value="dessert" />
            </Picker>
            <Text> Price (R) </Text>
            <TextInput placeholder="85.00" />
            <Button title="Save Item"/>

        </View>
    )

}