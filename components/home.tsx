import { View, Text, TextInput, Button } from "react-native";

export default function home() {
    return (
        <View>
            <View>
            <Text> My Menu</Text>
            </View>
            <TextInput placeholder="Search dishes..." />
            <Text>Menu List</Text>
            <View>
                <Text> Grilled Chicken Salad</Text>
                <Text> R85 </Text>
                <Text> Starters </Text>
                <Button title="Edit" />
            </View>
            <View>
                <Text> Beef Fillet & Chips </Text>
                <Text> R220 </Text>
                <Text> Main </Text>
                <Button title="Edit" />
            </View>
            <View>
                <Text> Chocolate Mouse </Text>
                <Text> R65 </Text>
                <Text> Dessert </Text>
                <Button title="Edit" />
            </View>
            <Button title="Add Menu Item" />

        </View>
    )

}