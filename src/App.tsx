import React, {CSSProperties, useMemo, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import MapCardContext, { IMapCardContextProps } from "./contexts/MapCardContext";
import AuthContext, { IAuthContextProps } from "./contexts/AuthContext";
import authService from "./services/AuthService";
import AuthRoute from "./components/auth/AuthRoute/AuthRoute";
import Signup from "./components/auth/Signup/Signup";
import Home from "./components/content/Home/Home";
import Login from "./components/auth/Login/Login";
import {MapDisplay} from "./components/content/MapDisplay/MapDisplay";
import {Navbar} from "./components/nav/Navbar/Navbar";
import "./App.css";
import {IMapCard} from "./interfaces";
import {Footer} from "./components/content/Footer/Footer";
import {About} from "./components/content/About/About";


export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    const [currentUser, setCurrentUser] = useState({userId: ""});
    const signUp = authService.signUpWithFirebaseEmailAndPassword;
    const login = authService.loginWithFirebaseEmailAndPassword;
    const logout = authService.logOutWithFirebase;
    const [isCardInCreation, setIsCardInCreation] = useState(false);
    const [isPersonInCreation, setIsPersonInCreation] = useState(false);
    const [mapCards, setMapCards] = useState<Map<string, IMapCard>>(new Map<string, IMapCard>());
    const [currentMap, setCurrentMap] = useState<IMapCard>({} as IMapCard);
    const [loadingCssOverride, setLoadingCssOverride] = useState<CSSProperties>(
        {
                    display: "block",
                    margin: "0 auto",
                    borderColor: "red",
                    position: "fixed",
                    top: "50%",
                    bottom: "50%",
                    left: "50%",
                    right: "50%"
                }
    );

    const authContextValue: IAuthContextProps = useMemo(() => ({
        currentUser,
        setCurrentUser,
        signUp,
        login,
        logout
    }), [currentUser, signUp, login, logout]);

    const mapCardContextValue: IMapCardContextProps = useMemo(() => ({
        isCardInCreation,
        setCardInCreation: setIsCardInCreation,
        isPersonInCreation,
        setPersonInCreation: setIsPersonInCreation,
        mapCards,
        setMapCards,
        currentMap,
        setCurrentMap,
        loadingCssOverride,
        setLoadingCssOverride
    }), [isCardInCreation, isPersonInCreation, mapCards, currentMap, loadingCssOverride]);

    return (
      <AuthContext.Provider value={authContextValue}>
        {!!currentUser.userId && <Navbar />}
        <MapCardContext.Provider value={mapCardContextValue}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <Home />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <AuthRoute>
                            <Home />
                        </AuthRoute>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/maps"
                    element={
                        <AuthRoute>
                            <MapDisplay />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <AuthRoute>
                            <About />
                        </AuthRoute>
                    }
                />
            </Routes>
        </MapCardContext.Provider>
        <Footer />
      </AuthContext.Provider>
  );
}

export default App;
