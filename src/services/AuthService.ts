import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase";


class AuthService {
    public async signUpWithFirebaseEmailAndPassword (email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    public async loginWithFirebaseEmailAndPassword (email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    public async logOutWithFirebase () {
        return signOut(auth);;
    }

}

export default new AuthService();