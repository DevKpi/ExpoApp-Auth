import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const SaveUserData = async (uid, userData) => {
    const userRef = doc(db, 'usuarios', uid);
    await setDoc(userRef, userData, { merge: true });
};

export const saveUserData = SaveUserData;

export const getUser = async (uid) => {
    try {
        const userRef = doc(db, 'usuarios', uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            return null;
        }

        return snapshot.data();
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return null;
    }
};

export const getUserData = getUser;