import React, {useMemo, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import MapCardContext, { IMapCardContextProps } from "./contexts/MapCardContext";
import AuthContext, { IAuthContextProps } from "./contexts/AuthContext";
import authService from "./services/AuthService";
import AuthRoute from "./components/auth/AuthRoute";
import Signup from "./components/auth/Signup";
import Home from "./components/content/Home";
import Login from "./components/auth/Login";
import {MapDisplay} from "./components/content/MapDisplay";
import {Navbar} from "./components/nav/Navbar";
import "./App.css";
import {IMapCard} from "./interfaces";
import {Footer} from "./components/content/Footer";
import {About} from "./components/content/About";


export interface IAppProps {};

const App: React.FunctionComponent<IAppProps> = (props) => {
    const [currentUser, setCurrentUser] = useState({userId: ""});
    const signUp = authService.signUpWithFirebaseEmailAndPassword;
    const login = authService.loginWithFirebaseEmailAndPassword;
    const logout = authService.logOutWithFirebase;
    const [isCardInCreation, setCardInCreation] = useState(false);
    const [isPersonInCreation, setPersonInCreation] = useState(false);
    const [mapCards, setMapCards] = useState<Map<string, IMapCard>>(new Map<string, IMapCard>);
    const [currentMap, setCurrentMap] = useState<IMapCard>({} as IMapCard);

    const authContextValue: IAuthContextProps = useMemo(() => ({
        currentUser,
        setCurrentUser,
        signUp,
        login,
        logout
    }), [currentUser, signUp, login, logout]);

    const mapCardContextValue: IMapCardContextProps = useMemo(() => ({
        isCardInCreation,
        setCardInCreation,
        isPersonInCreation,
        setPersonInCreation,
        mapCards,
        setMapCards,
        currentMap,
        setCurrentMap
    }), [isCardInCreation, isPersonInCreation, mapCards, currentMap]);

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
                {/*<Route exact path="/dashboard"> <Dashboard/> </Route>
          <Route exact path="/profile"> <Profile/> </Route>
          <Route exact path="/settings"> <Settings/> </Route>*/}
                {/*<Route exact path="/404"> <NotFound/> </Route>
          <Route exact path="/500"> <ServerError/> </Route>
          <Route> <NotFound/> </Route>*/}
            </Routes>
        </MapCardContext.Provider>
        <Footer />
      </AuthContext.Provider>
  );
}

export default App;