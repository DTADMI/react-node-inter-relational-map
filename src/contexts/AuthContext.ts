import React from 'react'
import { auth } from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {IUser} from "../interfaces";

const LOCAL_STORAGE_KEY = "CURRENT_USER";
const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
const getCurrentUser = () => {
    if(storedUser) {
        return JSON.parse(storedUser) as IUser;
    }
    return {userId: ""} as IUser;
}

export interface IAuthContextProps {
    currentUser: IUser;
    setCurrentUser: (user: IUser) => void,
    signUp: (email: string, password: string) =>  Promise<{}>,
    login: (email: string, password: string) =>  Promise<{}>,
    logout: () =>  Promise<void>
}

const defaultState: IAuthContextProps = {
    currentUser: getCurrentUser(),
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
