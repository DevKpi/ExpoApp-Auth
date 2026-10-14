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
        console.error('Error al seleccionar imagen de la galería:', error);
        Alert.alert('Error', 'No se pudo abrir la galería de imágenes.');
        return null;
    }
};

/**
 * Solicita permisos y abre la cámara del dispositivo para tomar una fotografía.
 * @param {object} options - Opciones adicionales para personalizar ImagePicker.
 * @returns {Promise<string|null>} Retorna la URI de la fotografía tomada o null si fue cancelado o rechazado.
 */
export const takePhoto = async (options = {}) => {
    try {
        // Solicitar permisos de cámara si es necesario
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permiso requerido',
                'Se necesitan permisos de acceso a la cámara para tomar una fotografía.'
            );
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            ...options,
        });

        console.log('Resultado de launchCameraAsync:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        console.error('Error al tomar fotografía:', error);
        Alert.alert('Error', 'No se pudo abrir la cámara.');
        return null;
    }
};

/**
 * Despliega un menú de opciones (Alert) para permitir al usuario elegir entre
 * tomar una foto con la cámara o seleccionar una imagen desde la galería.
 * @param {Function} onImagePicked - Callback que se ejecuta con la URI de la imagen seleccionada.
 */
export const showImageSourceOptions = (onImagePicked) => {
    Alert.alert(
        'Foto de Perfil',
        'Selecciona una opción para tu foto de perfil:',
        [
            {
                text: 'Tomar fotografía 📷',
                onPress: async () => {
                    const uri = await takePhoto();
                    if (uri && onImagePicked) {
                        onImagePicked(uri);
                    }
                },
            },
            {
                text: 'Cargar desde la galería 🖼️',
                onPress: async () => {
                    const uri = await pickImage();
                    if (uri && onImagePicked) {
                        onImagePicked(uri);
                    }
                },
            },
            {
                text: 'Cancelar',
                style: 'cancel',
            },
        ]
    );
};

export const seleccionarImagen = pickImage;
export const tomarFoto = takePhoto;

export default {
    pickImage,
    takePhoto,
    showImageSourceOptions,
    seleccionarImagen,
    tomarFoto,
};
