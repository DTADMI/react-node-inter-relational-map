import React, {useEffect, useMemo} from 'react'
import {auth} from "../firebase";

const AuthContext = React.createContext(undefined);

export function useAuth() {
    return React.useContext(AuthContext);
}
export function AuthProvider( { children }) {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const value = useMemo(() => ({
        currentUser,
        signUp,
        login
    }), [currentUser]);
    /*const value = {
        currentUser,
        signUp
    };*/

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
