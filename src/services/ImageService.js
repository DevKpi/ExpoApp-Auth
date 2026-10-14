import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * Solicita permisos y abre la galería de imágenes del dispositivo.
 * @param {object} options - Opciones adicionales para personalizar ImagePicker.
 * @returns {Promise<string|null>} Retorna la URI de la imagen seleccionada o null si fue cancelado o rechazado.
 */
export const pickImage = async (options = {}) => {
    try {
        // Solicitar permisos de galería si es necesario
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permiso requerido',
                'Se necesitan permisos de acceso a la galería para seleccionar una imagen.'
            );
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            ...options,
        });

        console.log('Resultado de ImagePicker:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        console.error('Error al seleccionar imagen:', error);
        Alert.alert('Error', 'No se pudo abrir la galería de imágenes.');
        return null;
    }
};

export const seleccionarImagen = pickImage;

export default {
    pickImage,
    seleccionarImagen,
};
