import { useContext, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SaveUserTask } from '../services/taskService';
import { styles } from '../styles/TaskStyles';

export default function AddTaskScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [titulo, setTitulo] = useState('');
    const [completada, setCompletada] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSaveTask = async () => {
        if (!titulo.trim()) {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.alert('Por favor ingresa un título para la tarea.');
            } else {
                Alert.alert('Campo requerido', 'Por favor ingresa un título para la tarea.');
            }
            return;
        }

        if (!user?.uid) {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.alert('No se encontró una sesión activa de usuario.');
            } else {
                Alert.alert('Error', 'No se encontró una sesión activa de usuario.');
            }
            return;
        }

        setLoading(true);
        try {
            await SaveUserTask({
                titulo: titulo.trim(),
                completada,
                userId: user.uid,
            });

            if (Platform.OS === 'web') {
                if (typeof window !== 'undefined' && window.alert) {
                    window.alert('Tarea creada correctamente.');
                }
                navigation.navigate('TaskScreen');
            } else {
                Alert.alert(
                    'Éxito',
                    'Tarea creada correctamente.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('TaskScreen'),
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => navigation.navigate('TaskScreen'),
                    }
                );
            }
        } catch (error) {
            console.error('Error al guardar tarea:', error);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.alert('No se pudo guardar la tarea. Intenta de nuevo.');
            } else {
                Alert.alert('Error', 'No se pudo guardar la tarea. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.badge}>Nueva Tarea</Text>
                    <Pressable onPress={() => navigation.navigate('TaskScreen')} hitSlop={10}>
                        <Text style={styles.backButtonText}>Cancelar</Text>
                    </Pressable>
                </View>
                <Text style={styles.title}>Crear Tarea</Text>
                <Text style={styles.subtitle}>Agrega una nueva tarea asignada a tu cuenta.</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.formContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formCard}>
                    <Text style={styles.label}>Título de la tarea</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Estudiar para el examen de React Native"
                        placeholderTextColor="#94a3b8"
                        value={titulo}
                        onChangeText={setTitulo}
                        autoCapitalize="sentences"
                        editable={!loading}
                    />

                    <View style={styles.switchRow}>
                        <View>
                            <Text style={styles.switchLabel}>¿Está completada?</Text>
                            <Text style={styles.switchSubLabel}>
                                {completada ? 'Marcada como completada' : 'Marcada como pendiente'}
                            </Text>
                        </View>
                        <Switch
                            value={completada}
                            onValueChange={setCompletada}
                            trackColor={{ false: '#cbd5e1', true: '#86efac' }}
                            thumbColor={completada ? '#16a34a' : '#f8fafc'}
                            disabled={loading}
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.primaryButtonPressed,
                        ]}
                        onPress={handleSaveTask}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Guardar Tarea</Text>
                        )}
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.secondaryButtonPressed,
                        ]}
                        onPress={() => navigation.navigate('TaskScreen')}
                        disabled={loading}
                    >
                        <Text style={styles.secondaryButtonText}>Volver a la lista</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
