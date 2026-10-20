import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { getCurrentLocation, watchPosition } from '../services/LocationService';
import { styles } from '../styles/LocationStyles';

export default function LocationScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isTracking, setIsTracking] = useState(false);
    const subscriptionRef = useRef(null);

    // Limpieza de la suscripción al desmontar el componente
    useEffect(() => {
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.remove();
                subscriptionRef.current = null;
            }
        };
    }, []);

    // Función para obtener la ubicación puntual
    const obtenerUbicacionPuntual = async () => {
        try {
            setLoading(true);
            const coords = await getCurrentLocation();
            setLocation(coords);
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
            handleLocationError(error);
        } finally {
            setLoading(false);
        }
    };

    // Función para alternar el seguimiento en tiempo real (watchPositionAsync)
    const toggleTracking = async () => {
        if (isTracking) {
            if (subscriptionRef.current) {
                subscriptionRef.current.remove();
                subscriptionRef.current = null;
            }
            setIsTracking(false);
            return;
        }

        try {
            setLoading(true);
            const subscription = await watchPosition((coords) => {
                setLocation(coords);
            });
            subscriptionRef.current = subscription;
            setIsTracking(true);
        } catch (error) {
            console.error('Error al iniciar el seguimiento:', error);
            handleLocationError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationError = (error) => {
        if (error?.message === 'LOCATION_DISABLED') {
            Alert.alert(
                'Ubicación Desactivada',
                'Por favor activa los servicios de ubicación en tu dispositivo.'
            );
        } else if (error?.message === 'LOCATION_PERMISSION_DENIED') {
            Alert.alert(
                'Permiso Denegado',
                'Necesitamos permiso para acceder a tu ubicación.'
            );
        } else {
            Alert.alert('Error', 'No fue posible acceder a la ubicación.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={[styles.badge, isTracking && styles.badgeActive]}>
                        {isTracking ? '● Seguimiento Activo' : 'Ubicación GPS'}
                    </Text>
                    {navigation && (
                        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                            <Text style={styles.backButtonText}>← Volver</Text>
                        </Pressable>
                    )}
                </View>
                <Text style={styles.title}>Mi Ubicación</Text>
                <Text style={styles.subtitle}>
                    {isTracking
                        ? 'Actualizando coordenadas en tiempo real según te desplazas'
                        : 'Obtén o realiza el seguimiento continuo de tus coordenadas'}
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {location ? (
                    <View style={styles.card}>
                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.cardTitle}>Coordenadas Actuales</Text>
                            {isTracking && (
                                <View style={styles.liveBadge}>
                                    <Text style={styles.liveBadgeText}>● EN VIVO</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.infoRowDivider}>
                            <Text style={styles.infoLabel}>Latitud:</Text>
                            <Text style={styles.infoValue}>{location.latitude}</Text>
                        </View>

                        <View style={styles.infoRowDivider}>
                            <Text style={styles.infoLabel}>Longitud:</Text>
                            <Text style={styles.infoValue}>{location.longitude}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Precisión estimada:</Text>
                            <Text style={styles.infoValue}>
                                {location.accuracy != null ? `± ${location.accuracy} metros` : 'No disponible'}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>Ubicación no obtenida</Text>
                        <Text style={styles.emptySubtitle}>
                            Inicia el seguimiento en tiempo real o consulta tu ubicación puntual mediante los botones inferiores.
                        </Text>
                    </View>
                )}

                <View style={styles.actionsContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            isTracking ? styles.stopButton : styles.primaryButton,
                            pressed && (isTracking ? styles.stopButtonPressed : styles.primaryButtonPressed),
                            loading && styles.primaryButtonDisabled,
                        ]}
                        onPress={toggleTracking}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={isTracking ? styles.stopButtonText : styles.primaryButtonText}>
                                {isTracking ? '⏹ Desactivar Seguimiento' : '📡 Iniciar Seguimiento (Tiempo Real)'}
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.secondaryButtonPressed,
                        ]}
                        onPress={obtenerUbicacionPuntual}
                        disabled={loading}
                    >
                        <Text style={styles.secondaryButtonText}>📍 Obtener Ubicación Puntual</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
