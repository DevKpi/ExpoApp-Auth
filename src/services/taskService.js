import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Guarda una tarea en la colección 'tareas' de Firestore.
 * Estructura de documento:
 * {
 *   titulo,
 *   completada,
 *   userId
 * }
 */
export const SaveUserTask = async (taskData, extraData) => {
    try {
        let task = {};

        if (typeof taskData === 'string' && typeof extraData === 'object' && extraData !== null) {
            // Soporta: SaveUserTask(userId, { titulo, completada })
            task = {
                titulo: extraData.titulo,
                completada: extraData.completada ?? false,
                userId: taskData,
            };
        } else if (typeof taskData === 'object' && taskData !== null) {
            // Soporta: SaveUserTask({ titulo, completada, userId })
            task = {
                titulo: taskData.titulo,
                completada: taskData.completada ?? false,
                userId: taskData.userId,
            };
        } else {
            throw new Error('Datos de tarea inválidos');
        }

        const docRef = await addDoc(collection(db, 'tareas'), task);
        return { id: docRef.id, ...task };
    } catch (error) {
        console.error('Error al guardar la tarea:', error);
        throw error;
    }
};

export const saveUserTask = SaveUserTask;

/**
 * Obtiene las tareas de la colección 'tareas' de Firestore.
 * Si se especifica userId, filtra por el usuario correspondiente.
 */
export const GetUserTask = async (userId) => {
    try {
        const tareasRef = collection(db, 'tareas');
        const q = userId
            ? query(tareasRef, where('userId', '==', userId))
            : query(tareasRef);

        const querySnapshot = await getDocs(q);

        const tasks = [];
        querySnapshot.forEach((docSnapshot) => {
            tasks.push({
                id: docSnapshot.id,
                ...docSnapshot.data(),
            });
        });

        return tasks;
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return [];
    }
};

export const getUserTask = GetUserTask;
export const getUserTasks = GetUserTask;