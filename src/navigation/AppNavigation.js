import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function AppNavigator() {

    const { user, checkingSession } = useContext(AuthContext);

    // Guardamos el usuario actual para decidir qué stack mostrar.
    // const [user, setUser] = useState(null);
    // const [checkingSession, setCheckingSession] = useState(true);

    // useEffect(() => {
    //     // Firebase avisa cada vez que la sesión cambia.
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setCheckingSession(false);
    //     });

    //     // Dejamos de escuchar cuando el componente se desmonta.
    //     return unsubscribe;
    // }, []);

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
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

// Estilos para la pantalla de carga mientras se revisa la sesión.
const styles = StyleSheet.create({
    loadingContainer: { 
        alignItems: 'center', 
        backgroundColor: '#f8fafc', 
        flex: 1, 
        justifyContent: 'center' 
    },
});