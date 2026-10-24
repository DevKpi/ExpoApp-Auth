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
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [loading, setLoading] = useState(false);

    const mapRef = useRef(null);

    const obtenerUbicacion = async () => {
        try {
            setLoading(true);

            const coords = await getCurrentLocation();
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                title: 'Mi ubicación',
            });

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

    const ubicarEnInitialRegion = () => {
        setLocation({
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            title: 'Región Inicial (San Pedro)',
        });

        mapRef.current?.animateToRegion(
            {
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
                latitudeDelta: initialRegion.latitudeDelta,
                longitudeDelta: initialRegion.longitudeDelta,
            },
            1000
        );
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
                onPress={(event) => {
                    const coordenadas = event.nativeEvent.coordinate;
                    console.log('Coordenadas capturadas:', coordenadas);
                    setSelectedPoint(coordenadas);
                }}
            >
                {/* Marcador de ubicación fija o actual */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.title || 'Mi ubicación'}
                        pinColor="#2563eb"
                    />
                )}

                {/* Marcador del punto seleccionado al tocar el mapa */}
                {selectedPoint && (
                    <Marker
                        coordinate={selectedPoint}
                        title="Punto seleccionado"
                        description={`Lat: ${selectedPoint.latitude.toFixed(5)}, Lon: ${selectedPoint.longitude.toFixed(5)}`}
                        pinColor="#ef4444"
                    />
                )}
            </MapView>

            {/* Banner flotante si hay un punto seleccionado */}
            {selectedPoint && (
                <View style={styles.selectedPointBanner}>
                    <View style={styles.selectedPointInfo}>
                        <Text style={styles.selectedPointTitle}>📍 Punto marcado:</Text>
                        <Text style={styles.selectedPointCoords}>
                            {selectedPoint.latitude.toFixed(5)}, {selectedPoint.longitude.toFixed(5)}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => setSelectedPoint(null)}
                        hitSlop={8}
                        style={styles.clearButton}
                    >
                        <Text style={styles.clearButtonText}>✕</Text>
                    </Pressable>
                </View>
            )}

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

                <Pressable
                    style={({ pressed }) => [
                        styles.secondaryButton,
                        pressed && styles.secondaryButtonPressed,
                    ]}
                    onPress={ubicarEnInitialRegion}
                >
                    <Text style={styles.secondaryButtonText}>📌 Ubicar en Región Inicial</Text>
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
    selectedPointBanner: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 96,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        zIndex: 20,
    },
    selectedPointInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    selectedPointTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0f172a',
    },
    selectedPointCoords: {
        fontSize: 13,
        color: '#475569',
        fontVariant: ['tabular-nums'],
    },
    clearButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    controls: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        gap: 10,
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
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#cbd5e1',
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    secondaryButtonPressed: {
        backgroundColor: '#f1f5f9',
        transform: [{ scale: 0.99 }],
    },
    secondaryButtonText: {
        color: '#1e293b',
        fontSize: 15,
        fontWeight: '600',
    },
});
