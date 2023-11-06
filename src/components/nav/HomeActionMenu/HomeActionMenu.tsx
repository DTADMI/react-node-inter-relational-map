import React from "react";
import {BtnAddMap} from "../../content/BtnAddMap/BtnAddMap";

export const HomeActionMenu = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"
             style={{position: "fixed", top: "3.9rem", right: "0", left: "0", zIndex: "1030", height: "3.3rem"}}>
            <div className="container-fluid">
                <button className="navbar-toggler btn btn-dark btn-outline-primary" type="button"
                        data-bs-toggle="collapse" data-bs-target="#homeActionMenuNavbarText"
                        aria-controls="homeActionMenuNavbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="homeActionMenuNavbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <BtnAddMap/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}