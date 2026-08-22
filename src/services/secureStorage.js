import * as SecureStore from 'expo-secure-store';


export const guardarToken = async (token) => {


    try {


        await SecureStore.setItemAsync('userToken', token);


    } catch (error) {


        console.error('Error al guardar el token', error);


    }


};
