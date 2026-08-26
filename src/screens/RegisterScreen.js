import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { register } from '../firebase/authService';
import { styles } from '../styles/RegisterStyles';

const firebaseMessages = {
    'auth/email-already-in-use': 'Ese correo ya tiene una cuenta.',
    'auth/invalid-email': 'Escribe un correo electrónico válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
};

export default function RegisterScreen({ navigation }) {
    // Guardamos los datos que escribe el alumno en el formulario.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        // No intentamos registrar usuarios con campos vacíos.
        if (!email.trim() || !password) {
            Alert.alert('Faltan datos', 'Completa el correo y la contraseña.');
            return;
        }

        // Validación local para no consumir llamadas a la API de Firebase si no cumple el mínimo requerido.
        if (password.length < 6) {
            Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);
        try {
            // Firebase crea la cuenta y también inicia la sesión.
            await register(email.trim(), password);
        } catch (error) {
            Alert.alert('Firebase Auth', firebaseMessages[error.code] || 'No se pudo crear la cuenta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.badge}>Nuevo Usuario</Text>
                    <Text style={styles.title}>Crea tu cuenta</Text>
                    <Text style={styles.subtitle}>Regístrate con correo y contraseña.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="tu@correo.com"
                        placeholderTextColor="#94a3b8"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.passwordRow}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                            <Text style={styles.showPassword}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.primaryButtonPressed,
                        ]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                        )}
                    </Pressable>
                </View>

                <Pressable onPress={() => navigation.navigate('Login')} style={styles.bottomButton}>
                    <Text style={styles.bottomText}>
                        ¿Ya tienes cuenta? <Text style={styles.linkText}>Inicia sesión</Text>
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}