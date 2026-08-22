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
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { styles } from '../styles/LoginStyles';

const firebaseMessages = {
    'auth/invalid-email': 'Escribe un correo electrónico válido.',
    'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
};

export default function LoginScreen({ navigation }) {
    // Estos estados controlan los campos y el estado visual del formulario.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const getErrorMessage = (error) => firebaseMessages[error.code] || 'No se pudo iniciar sesión.';

    const handleLogin = async () => {
        // Validamos antes de enviar datos a Firebase.
        if (!email.trim() || !password) {
            Alert.alert('Faltan datos', 'Completa el correo y la contraseña.');
            return;
        }

        setLoading(true);
        try {
            // Firebase comprueba las credenciales y crea la sesión.
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (error) {
            Alert.alert('Firebase Auth', getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Escribe tu correo', 'Necesitamos tu correo para enviarte el enlace.');
            return;
        }

        try {
            // Firebase envía un enlace de recuperación al correo indicado.
            await sendPasswordResetEmail(auth, email.trim());
            Alert.alert('Correo enviado', 'Revisa tu bandeja para restablecer la contraseña.');
        } catch (error) {
            Alert.alert('Firebase Auth', getErrorMessage(error));
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
                    <Text style={styles.badge}>Firebase Auth</Text>
                    <Text style={styles.title}>Bienvenido de nuevo</Text>
                    <Text style={styles.subtitle}>Inicia sesión para continuar.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    {/* value y onChangeText conectan el input con el estado. */}
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
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Entrar</Text>
                        )}
                    </Pressable>

                    <Pressable onPress={handleResetPassword} style={styles.linkButton}>
                        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                </View>

                <Pressable onPress={() => navigation.navigate('Registro')} style={styles.bottomButton}>
                    <Text style={styles.bottomText}>
                        ¿No tienes cuenta? <Text style={styles.linkText}>Regístrate</Text>
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}