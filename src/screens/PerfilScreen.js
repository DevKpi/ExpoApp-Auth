import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
// import { auth } from '../firebase/firebase';
import { logout } from '../firebase/authService';
import { styles } from '../styles/PerfilStyles';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { saveUserData, getUser } from '../services/userService';
import { guardarImagenPerfil, obtenerImagenPerfil } from '../services/storageService';
import { pickImage as pickImageService } from '../services/ImageService';

export default function PerfilScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    // const user = auth.currentUser;
    const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log('--- [PerfilScreen] 1. useEffect iniciado ---');
        console.log('[PerfilScreen] Estado de user en AuthContext:', user);

        const loadProfile = async () => {
            if (!user?.uid) {
                console.log('⚠️ [PerfilScreen] 2. No hay usuario autenticado o user.uid aún no está disponible. Saliendo de loadProfile.');
                return;
            }

            console.log(`🚀 [PerfilScreen] 2. Iniciando carga de perfil para UID: ${user.uid} (${user.email || 'Sin correo'})`);

            try {
                console.log('📡 [PerfilScreen] 3. Llamando a getUser(uid)...');
                const data = await getUser(user.uid);

                console.log('📥 [PerfilScreen] 4. Resultado obtenido de getUser:', data);

                if (data) {
                    console.log('✅ [PerfilScreen] 5. Datos encontrados en la colección "usuarios":', data);
                } else {
                    console.log('ℹ️ [PerfilScreen] 5. No se encontró documento para este UID en "usuarios" (retornó null).');
                }

                setProfile(data);
                console.log('💾 [PerfilScreen] 6. setProfile(data) ejecutado.');
            } catch (error) {
                console.error('❌ [PerfilScreen] Error al cargar perfil:', error);
            }
        };

        const loadStoredImage = async () => {
            try {
                console.log('📡 [PerfilScreen] Cargando imagen previa desde almacenamiento local...');
                const savedImage = await obtenerImagenPerfil(user?.uid);
                if (savedImage) {
                    console.log('📸 [PerfilScreen] Imagen recuperada de almacenamiento:', savedImage);
                    setImage(savedImage);
                }
            } catch (error) {
                console.error('❌ [PerfilScreen] Error al cargar imagen del almacenamiento:', error);
            }
        };

        loadProfile();
        loadStoredImage();

        return () => {
            console.log('🧹 [PerfilScreen] Limpieza del useEffect (desmontaje o cambio de usuario)');
        };
    }, [user?.uid]);


    // addDoc(
    //     collection(db, 'usuarios'),
    //     {
    //         nombre: 'Juan',
    //         email: 'juan@email.com'
    //     }
    // );



    // setDoc(doc(db, 'users', user.uid), {
    //     email: user.email,
    //     uid: user.uid,
    //     camptest: 'Perfil de usuario',
    // }, { merge: true })
    // .then(() => {
    //     console.log('Datos del usuario guardados correctamente en Firestore.');
    // })
    // .catch((error) => {
    //     console.error('Error al guardar los datos del usuario en Firestore:', error);
    // });

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión.');
        }
    };

    const pickImage = async () => {
        const uri = await pickImageService();
        if (uri) {
            setImage(uri);
            console.log(uri);
            await guardarImagenPerfil(uri, user?.uid);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable
                        onPress={pickImage}
                        style={({ pressed }) => [
                            styles.avatarContainer,
                            pressed && { opacity: 0.8 },
                        ]}
                        hitSlop={8}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 92, height: 92, borderRadius: 46 }}
                            />
                        ) : (
                            <Text style={styles.avatarText}>{initial}</Text>
                        )}
                    </Pressable>
                    <Text style={styles.badge}>Perfil de Usuario</Text>
                    <Text style={styles.title}>Mi Cuenta</Text>
                    <Text style={styles.subtitle}>Gestiona y visualiza la información de tu perfil</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Datos de la Cuenta</Text>

                    <View style={styles.infoRowDivider}>
                        <Text style={styles.infoLabel}>Correo electrónico:</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Sin correo'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Identificador único (UID):</Text>
                        <Text style={styles.infoValueMuted}>
                            {user?.uid || 'No disponible'}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.primaryButtonPressed,
                        ]}
                        onPress={pickImage}
                    >
                        <Text style={styles.primaryButtonText}>📷 Seleccionar Foto de Perfil</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.secondaryButtonPressed,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.logoutButton,
                            pressed && styles.logoutButtonPressed,
                        ]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}