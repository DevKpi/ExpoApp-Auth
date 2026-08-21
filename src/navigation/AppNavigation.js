import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    // Guardamos el usuario actual para decidir qué pantallas mostrar.
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        // Firebase avisa cada vez que la sesión cambia.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCheckingSession(false);
        });

        // Dejamos de escuchar cuando el componente se desmonta.
        return unsubscribe;
    }, []);

    // Mientras Firebase revisa la sesión mostramos una carga.
    if (checkingSession) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {/* Opciones según el estado de la sesión */}
            {user ? (
                // Opciones con sesión
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inicio" component={HomeScreen} />
                </Stack.Navigator>
            ) : (
                // Opciones sin sesión
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Registro" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: { alignItems: 'center', backgroundColor: '#f8fafc', flex: 1, justifyContent: 'center' },
});