import { useCallback, useContext, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Platform,
    Pressable,
    RefreshControl,
    Text,
    View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { GetUserTask, SetUserTask } from '../services/taskService';
import { styles } from '../styles/TaskStyles';

export default function TaskScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);

    const loadTasks = async () => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        try {
            const data = await GetUserTask(user.uid);
            setTasks(data || []);
        } catch (error) {
            console.error('Error al cargar las tareas:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleToggleTask = async (task) => {
        if (!task?.id || updatingTaskId === task.id) return;

        const newStatus = !task.completada;
        setUpdatingTaskId(task.id);

        try {
            await SetUserTask(task.id, { completada: newStatus });
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === task.id ? { ...t, completada: newStatus } : t
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.alert('No se pudo actualizar el estado de la tarea.');
            } else {
                Alert.alert('Error', 'No se pudo actualizar el estado de la tarea.');
            }
        } finally {
            setUpdatingTaskId(null);
        }
    };

    // Recarga las tareas cada vez que la pantalla vuelve a estar en foco
    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [user?.uid])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadTasks();
    };

    const renderTaskItem = ({ item }) => {
        const isCompleted = Boolean(item.completada);
        const isUpdating = updatingTaskId === item.id;

        return (
            <View style={[styles.taskCard, isCompleted && styles.taskCardCompleted]}>
                <View style={styles.taskHeader}>
                    <Text style={[styles.taskTitle, isCompleted && styles.taskTitleCompleted]}>
                        {item.titulo}
                    </Text>
                    <Pressable
                        onPress={() => handleToggleTask(item)}
                        disabled={isUpdating}
                        hitSlop={8}
                        style={({ pressed }) => [
                            styles.statusBadge,
                            isCompleted ? styles.statusBadgeCompleted : styles.statusBadgePending,
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <Text
                            style={
                                isCompleted ? styles.statusTextCompleted : styles.statusTextPending
                            }
                        >
                            {isCompleted ? 'Completada' : 'Pendiente'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.taskActions}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.toggleButton,
                            isCompleted ? styles.toggleButtonCompleted : styles.toggleButtonPending,
                            pressed && styles.toggleButtonPressed,
                        ]}
                        onPress={() => handleToggleTask(item)}
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <ActivityIndicator
                                size="small"
                                color={isCompleted ? '#b45309' : '#16a34a'}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.toggleButtonText,
                                    isCompleted
                                        ? styles.toggleButtonTextCompleted
                                        : styles.toggleButtonTextPending,
                                ]}
                            >
                                {isCompleted ? '↺ Marcar como pendiente' : '✓ Marcar como completada'}
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        );
    };

    const renderEmptyList = () => {
        if (loading) return null;

        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyTitle}>No tienes tareas asignadas</Text>
                <Text style={styles.emptySubtitle}>
                    Comienza agregando una nueva tarea con el botón de abajo.
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.badge}>Tareas del Usuario</Text>
                    <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                        <Text style={styles.backButtonText}>← Volver</Text>
                    </Pressable>
                </View>
                <Text style={styles.title}>Mis Tareas</Text>
                <Text style={styles.subtitle}>
                    {tasks.length === 1 ? '1 tarea registrada' : `${tasks.length} tareas registradas`}
                </Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text style={styles.loadingText}>Cargando tareas...</Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id || item.titulo}
                    renderItem={renderTaskItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={renderEmptyList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#2563eb']}
                        />
                    }
                />
            )}

            <Pressable
                style={({ pressed }) => [
                    styles.fabButton,
                    pressed && styles.fabButtonPressed,
                ]}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={styles.fabIcon}>+</Text>
                <Text style={styles.fabText}>Nueva Tarea</Text>
            </Pressable>
        </View>
    );
}
