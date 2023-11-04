import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import authContext from "../../contexts/AuthContext";
import "./Navbar.css";
export const Navbar = () => {

    const {
        setCurrentUser,
        logout
    } = useContext(authContext);
    const handleLogout = async () => {
        await logout();
        setCurrentUser({userId: ""});
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top " style={{ backgroundColor: "#2583c5" }}>
            <a  className="navbar-brand mr-0 mr-md-2" href="/" style={{border: "1px solid",
                borderColor: "blueviolet"}}><img className="card-img-top pl-1" src="/images/logo.png" alt="InterRel-Map"/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link btn btn-light btn-outline-primary" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn btn-light btn-outline-primary" href="/about">About</a>
                    </li>
                </ul>
                <div className="hanging-right-elt">
      <Button className="btn  btn-outline-dark" onClick={handleLogout}>Logout</Button>
    </div>
            </div>
        </nav>
    );
};
