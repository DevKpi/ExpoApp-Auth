import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentLocation } from '../services/locationService';

const initialRegion = {
    latitude: -33.68,
    longitude: -59.66,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export default function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const mapRef = useRef(null);

    const obtenerUbicacion = async () => {
        try {
            setLoading(true);

            const coords = await getCurrentLocation();
            setLocation(coords);

            mapRef.current?.animateToRegion(
                {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                1000
            );
        } catch (error) {
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
                Alert.alert('Error', 'No se pudo obtener la ubicación.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Cabecera superior con botón para volver hacia atrás */}
            <View style={styles.header}>
                <Pressable
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.backButtonPressed,
                    ]}
                    onPress={() => navigation?.goBack()}
                    hitSlop={12}
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Mapa</Text>
                <View style={styles.headerSpacer} />
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Mi ubicación"
                    />
                )}
            </MapView>

            <View style={styles.controls}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                        loading && styles.buttonDisabled,
                    ]}
                    onPress={obtenerUbicacion}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>📍 Ir a mi ubicación</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 56 : 42,
        paddingHorizontal: 20,
        paddingBottom: 14,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
        elevation: 5,
    },
    backButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    backButtonPressed: {
        opacity: 0.6,
    },
    backButtonText: {
        color: '#2563eb',
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0f172a',
    },
    headerSpacer: {
        width: 60,
    },
    map: {
        flex: 1,
    },
    controls: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        zIndex: 20,
        elevation: 5,
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonPressed: {
        backgroundColor: '#1d4ed8',
        transform: [{ scale: 0.99 }],
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
