import React from 'react'
import { auth } from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

export interface IAuthContextProps {
    currentUser: {},
    setCurrentUser: (user: {}) => void,
    signUp: (email: string, password: string) =>  Promise<{}>,
    login: (email: string, password: string) =>  Promise<{}>,
    logout: () =>  Promise<void>
}

const defaultState: IAuthContextProps = {
    currentUser: {},
    setCurrentUser: () => {},
    signUp: (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    },
    login: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    },
    logout: () => {
        return signOut(auth);
    }
};

export default React.createContext(defaultState);
