import { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Menu from './components/Menu';
import Home from './components/Home';

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
    {id: "1", name: "Grilled Chicken Salad", description: "Freshly grilled chicken served on a bed of mixed greens with a light vinaigrette.", course: "Starters", price: "85"},
    {id: "2", name: "Beef Fillet & Chips", description: "Succulent beef fillet cooked to perfection, served with golden fries.", course: "Main Courses", price: "220"},
    {id: "3", name: "Chocolate Mousse", description: "Rich and creamy chocolate mousse topped with whipped cream.", course: "Desserts", price: "65"},
  ]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuContext.Provider>
  );
}
