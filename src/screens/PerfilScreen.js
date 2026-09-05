import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
// import { auth } from '../firebase/firebase';
import { logout } from '../firebase/authService';
import { styles } from '../styles/PerfilStyles';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PerfilScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    // const user = auth.currentUser;
    const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{initial}</Text>
                    </View>
                    <Text style={styles.badge}>Perfil de Usuario</Text>
                    <Text style={styles.title}>Mi Cuenta</Text>
                    <Text style={styles.subtitle}>Gestiona y visualiza la información de tu perfil</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Datos de la Cuenta</Text>

                    <View style={styles.infoRowDivider}>
                        <Text style={styles.infoLabel}>Correo electrónico:</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Sin correo'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Identificador único (UID):</Text>
                        <Text style={styles.infoValueMuted}>
                            {user?.uid || 'No disponible'}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.secondaryButtonPressed,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.logoutButton,
                            pressed && styles.logoutButtonPressed,
                        ]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}