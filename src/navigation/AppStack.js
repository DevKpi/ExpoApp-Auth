import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            {/* <Stack.Screen name="Configuración" component={ConfigScreen} /> */}
        </Stack.Navigator>
    );
}
