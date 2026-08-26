import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Registra un nuevo usuario con correo electrónico y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Inicia sesión con correo electrónico y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Cierra la sesión activa del usuario.
 * @returns {Promise<void>}
 */
export const logout = () => {
    return signOut(auth);
};

/**
 * Envía un correo electrónico para restablecer la contraseña.
 * @param {string} email
 * @returns {Promise<void>}
 */
export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
};
