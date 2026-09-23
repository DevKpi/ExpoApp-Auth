import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

/**
 * Actualiza una tarea en la colección 'tareas' de Firestore.
 * Utilizado para alternar el estado (completada) o actualizar campos de una tarea.
 *
 * Soporta diferentes formatos:
 * - SetUserTask(taskId, { completada: true })
 * - SetUserTask(taskId, true) // actualiza directamente el estado completada
 * - SetUserTask({ id: taskId, completada: true })
 */
export const SetUserTask = async (taskIdOrTask, taskData) => {
    try {
        let taskId = '';
        let updateData = {};

        if (typeof taskIdOrTask === 'string') {
            taskId = taskIdOrTask;
            if (typeof taskData === 'boolean') {
                updateData = { completada: taskData };
            } else if (typeof taskData === 'object' && taskData !== null) {
                updateData = { ...taskData };
            } else {
                throw new Error('Datos de actualización inválidos');
            }
        } else if (typeof taskIdOrTask === 'object' && taskIdOrTask !== null) {
            taskId = taskIdOrTask.id || taskIdOrTask.taskId;
            if (taskData && typeof taskData === 'object') {
                updateData = { ...taskData };
            } else if (typeof taskData === 'boolean') {
                updateData = { completada: taskData };
            } else {
                const { id, taskId: _, ...rest } = taskIdOrTask;
                updateData = rest;
            }
        } else {
            throw new Error('Parámetros de tarea inválidos');
        }

        if (!taskId) {
            throw new Error('ID de la tarea no proporcionado para actualizar');
        }

        const taskRef = doc(db, 'tareas', taskId);
        await updateDoc(taskRef, updateData);

        return { id: taskId, ...updateData };
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        throw error;
    }
};

export const setUserTask = SetUserTask;
export const UpdateUserTask = SetUserTask;
export const updateUserTask = SetUserTask;

/**
 * Elimina una tarea de la colección 'tareas' de Firestore usando deleteDoc.
 *
 * Soporta:
 * - DeleteUserTask(taskId)
 * - DeleteUserTask({ id: taskId })
 */
export const DeleteUserTask = async (taskIdOrTask) => {
    try {
        let taskId = '';

        if (typeof taskIdOrTask === 'string') {
            taskId = taskIdOrTask;
        } else if (typeof taskIdOrTask === 'object' && taskIdOrTask !== null) {
            taskId = taskIdOrTask.id || taskIdOrTask.taskId;
        }

        if (!taskId) {
            throw new Error('ID de la tarea no proporcionado para eliminar');
        }

        const taskRef = doc(db, 'tareas', taskId);
        await deleteDoc(taskRef);

        return { success: true, id: taskId };
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw error;
    }
};

export const deleteUserTask = DeleteUserTask;
export const DeleteTask = DeleteUserTask;
export const deleteTask = DeleteUserTask;