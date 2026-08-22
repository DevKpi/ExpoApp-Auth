import * as SecureStore from 'expo-secure-store';


export const guardarToken = async (token) => {


    try {


        await SecureStore.setItemAsync('userToken', token);


    } catch (error) {


        console.error('Error al guardar el token', error);


    }


};

export const obtenerToken = async () => {


    try {


        return await SecureStore.getItemAsync('userToken');


    } catch (error) {


        console.error('Error al obtener el token',error);


        return null;


    }


};

export const eliminarToken = async () => {


    try {


        await SecureStore.deleteItemAsync('userToken');


    } catch (error) {


        console.error('Error al eliminar el token',error);


    }


};
