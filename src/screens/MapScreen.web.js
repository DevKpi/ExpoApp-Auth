import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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

    const obtenerUbicacion = async () => {
        try {
            setLoading(true);
            const coords = await getCurrentLocation();
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                title: 'Mi ubicación',
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener la ubicación.');
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
    };

    const abrirGoogleMaps = () => {
        const lat = location ? location.latitude : initialRegion.latitude;
        const lng = location ? location.longitude : initialRegion.longitude;
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {/* Cabecera superior con botón para volver */}
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

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.icon}>🗺️</Text>
                    <Text style={styles.title}>Mapa no disponible en Web</Text>
                    <Text style={styles.description}>
                        La librería <Text style={styles.bold}>react-native-maps</Text> está diseñada
                        exclusivamente para componentes nativos de <Text style={styles.bold}>Android e iOS</Text>.
                    </Text>
                    <Text style={styles.subdescription}>
                        Para interactuar con el mapa nativo, ejecuta la app en un emulador o escanea el código QR con la app <Text style={styles.bold}>Expo Go</Text> en tu celular.
                    </Text>

                    {location && (
                        <View style={styles.coordsBox}>
                            <Text style={styles.coordsTitle}>{location.title || 'Coordenadas'}:</Text>
                            <Text style={styles.coordsText}>Latitud: {location.latitude}</Text>
                            <Text style={styles.coordsText}>Longitud: {location.longitude}</Text>
                        </View>
                    )}

                    <View style={styles.buttonGroup}>
                        <Pressable
                            style={styles.primaryButton}
                            onPress={obtenerUbicacion}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>📍 Obtener mi ubicación actual</Text>
                            )}
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={ubicarEnInitialRegion}
                        >
                            <Text style={styles.secondaryButtonText}>📌 Ubicar en Región Inicial</Text>
                        </Pressable>

                        <Pressable
                            style={styles.outlineButton}
                            onPress={abrirGoogleMaps}
                        >
                            <Text style={styles.outlineButtonText}>🌐 Ver en Google Maps (Navegador)</Text>
                        </Pressable>
                    </View>
                </View>
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
        cursor: 'pointer',
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
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 32,
        maxWidth: 520,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 8,
    },
    subdescription: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    bold: {
        fontWeight: '700',
        color: '#1e293b',
    },
    coordsBox: {
        width: '100%',
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    coordsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 4,
    },
    coordsText: {
        fontSize: 13,
        color: '#64748b',
    },
    buttonGroup: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        cursor: 'pointer',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#cbd5e1',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        cursor: 'pointer',
    },
    secondaryButtonText: {
        color: '#1e293b',
        fontSize: 15,
        fontWeight: '600',
    },
    outlineButton: {
        backgroundColor: '#f8fafc',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        cursor: 'pointer',
    },
    outlineButtonText: {
        color: '#334155',
        fontSize: 15,
        fontWeight: '600',
    },
});
