import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';


export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCheckingSession(false);
        });


        return unsubscribe;
    }, []);


    return (
        <AuthContext.Provider value={{ user, checkingSession }}>
            {children}
        </AuthContext.Provider>
    );
}
