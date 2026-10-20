import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
    const enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
        throw new Error('LOCATION_DISABLED');
    }

    const permiso = await Location.requestForegroundPermissionsAsync();

    if (permiso.status !== 'granted') {
        throw new Error('LOCATION_PERMISSION_DENIED');
    }

    const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    return {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
        accuracy: result.coords.accuracy,
    };
};

export const watchLocation = async (onLocationUpdate, options = {}) => {
    const enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
        throw new Error('LOCATION_DISABLED');
    }

    const permiso = await Location.requestForegroundPermissionsAsync();

    if (permiso.status !== 'granted') {
        throw new Error('LOCATION_PERMISSION_DENIED');
    }

    const subscription = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 10,
            ...options,
        },
        (position) => {
            console.log(position.coords);
            if (onLocationUpdate && position?.coords) {
                onLocationUpdate(position.coords);
            }
        }
    );

    return subscription;
};

export const watchPosition = watchLocation;
