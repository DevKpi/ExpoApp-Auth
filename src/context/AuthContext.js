import { createContext, useState } from 'react';


export const AuthContext = createContext();


export function AuthProvider({ children }) {


    const [user, setUser] = useState({ email: 'pepe@example.com', uid: '123' });


    return (


        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>


    );


}
