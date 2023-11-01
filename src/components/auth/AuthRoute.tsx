import React, {useContext, useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import authContext from "../../contexts/AuthContext";
import {IUser} from "../../interfaces";
import firebase from "firebase/compat";

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props: React.PropsWithChildren<IAuthRouteProps>) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        setCurrentUser
    } = useContext(authContext);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({userId: user.uid});
                setLoading(false);
            } else {
                setCurrentUser({userId: ""});
                console.log('unauthorized');
                navigate('/login');
            }
        });

        return () => AuthCheck();
    }, [auth, navigate]);

    if (loading) return <p>loading ...</p>;

    return <>{children}</>;
};

export default AuthRoute;
