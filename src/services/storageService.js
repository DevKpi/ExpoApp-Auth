import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_IMAGE_KEY = 'user_profile_image';

/**
 * Guarda la URI de la imagen de perfil en el almacenamiento local.
 * Se guarda asociada al UID del usuario (si está disponible) y como clave general de respaldo.
 * También respalda en window.localStorage si se ejecuta en entorno Web.
 */
export const guardarImagenPerfil = async (uri, uid = null) => {
    try {
        const key = uid ? `${PROFILE_IMAGE_KEY}_${uid}` : PROFILE_IMAGE_KEY;
        await AsyncStorage.setItem(key, uri);

        if (uid) {
            await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
        }

        // Respaldo en localStorage del navegador si está disponible (Web)
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(key, uri);
                localStorage.setItem(PROFILE_IMAGE_KEY, uri);
            } catch (storageError) {
                console.warn('No se pudo guardar en localStorage web:', storageError);
            }
        }

        console.log('💾 [storageService] Imagen guardada en almacenamiento local:', uri);
    } catch (error) {
        console.error('❌ [storageService] Error al guardar imagen de perfil:', error);
    }
};

/**
 * Obtiene la URI de la imagen de perfil previamente guardada en el almacenamiento local.
 */
export const obtenerImagenPerfil = async (uid = null) => {
    try {
        let uri = null;

        if (uid) {
            uri = await AsyncStorage.getItem(`${PROFILE_IMAGE_KEY}_${uid}`);
        }

        if (!uri) {
            uri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
        }

        // Respaldo desde localStorage del navegador si no se encontró en AsyncStorage (Web)
        if (!uri && typeof localStorage !== 'undefined') {
            try {
                uri = (uid ? localStorage.getItem(`${PROFILE_IMAGE_KEY}_${uid}`) : null) || localStorage.getItem(PROFILE_IMAGE_KEY);
            } catch (storageError) {
                console.warn('No se pudo leer de localStorage web:', storageError);
            }
        }

        return uri;
    } catch (error) {
        console.error('❌ [storageService] Error al obtener imagen de perfil:', error);
        return null;
    }
};

/**
 * Elimina la imagen de perfil del almacenamiento local.
 */
export const eliminarImagenPerfil = async (uid = null) => {
    try {
        if (uid) {
            await AsyncStorage.removeItem(`${PROFILE_IMAGE_KEY}_${uid}`);
        }
        await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);

        if (typeof localStorage !== 'undefined') {
            try {
                if (uid) localStorage.removeItem(`${PROFILE_IMAGE_KEY}_${uid}`);
                localStorage.removeItem(PROFILE_IMAGE_KEY);
            } catch (storageError) {
                console.warn('No se pudo eliminar de localStorage web:', storageError);
            }
        }
    } catch (error) {
        console.error('❌ [storageService] Error al eliminar imagen de perfil:', error);
    }
};

export const guardarItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            } catch (e) {}
        }
    } catch (error) {
        console.error(`❌ [storageService] Error al guardar ${key}:`, error);
    }
};

export const obtenerItem = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (!value && typeof localStorage !== 'undefined') {
            try {
                value = localStorage.getItem(key);
            } catch (e) {}
        }
        return value;
    } catch (error) {
        console.error(`❌ [storageService] Error al obtener ${key}:`, error);
        return null;
    }
};

export const eliminarItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.removeItem(key);
            } catch (e) {}
        }
    } catch (error) {
        console.error(`❌ [storageService] Error al eliminar ${key}:`, error);
    }
};

export default {
    guardarImagenPerfil,
    obtenerImagenPerfil,
    eliminarImagenPerfil,
    guardarItem,
    obtenerItem,
    eliminarItem,
};