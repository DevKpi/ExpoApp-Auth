import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { styles } from '../styles/HomeStyles';

export default function HomeScreen() {
    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.badge}>Sesión Activa</Text>
                    <Text style={styles.title}>¡Hola de nuevo!</Text>
                    <Text style={styles.subtitle}>Has iniciado sesión con éxito en Firebase.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Datos de la Cuenta</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Correo electrónico:</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Sin correo'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Identificador único (UID):</Text>
                        <Text style={[styles.infoValue, { fontSize: 13, color: '#64748b' }]}>
                            {user?.uid || 'No disponible'}
                        </Text>
                    </View>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.logoutButtonPressed,
                    ]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}
