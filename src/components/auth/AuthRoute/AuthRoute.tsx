import React, {useContext, useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import authContext from "../../../contexts/AuthContext";

const LOCAL_STORAGE_KEY = "CURRENT_USER";

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
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({userId: user.uid}));
                setLoading(false);
            } else {
                setCurrentUser({userId: ""});
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({userId: ""}));
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
