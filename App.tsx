import { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Edit from "./components/edit";
import Details from "./components/details";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};
export const MenuContext = createContext<MenuContextType | null>(null);

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Bobotie Springbok",
      description: "Spiced mince baked with an egg topping.",
      course: "Main Course",
      price: "85",
    },
    {
      id: "2",
      name: "Chakalaka Bites",
      description: "Crisp fritters with warm chakalaka relish.",
      course: "Starters",
      price: "45",
    },
    {
      id: "3",
      name: "Malva Pudding",
      description: "Warm sponge pudding with creamy custard.",
      course: "Desserts",
      price: "60",
    },
    {
      id: "4",
      name: "Pea Soup",
      description: "Hearty pea soup with fresh cream.",
      course: "Starters",
      price: "40",
    },
  ]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuContext.Provider>
  );
}
