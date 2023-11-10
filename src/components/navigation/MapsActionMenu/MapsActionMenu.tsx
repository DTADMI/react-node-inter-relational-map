import React, {useContext} from "react";
import PersonForm from "../../content/PersonForm/PersonForm";
import mapCardContext from "../../../contexts/MapCardContext";

export const MapsActionMenu = () => {

    const {
        setPersonInCreation
    } = useContext(mapCardContext);

    return (
        <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
            <div
                className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                    id="menu">
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle px-sm-0 px-2" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">People</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                            <li><button type="button" className="btn btn-light dropdown-item" onClick={()=>setPersonInCreation(true)}>Add</button></li>
                            <li><a className="dropdown-item" href="#">Search</a></li>
                        </ul>
                        <PersonForm />
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle px-sm-0 px-2" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">Relationships</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#">Add</a></li>
                            <li><a className="dropdown-item" href="#">Search</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle px-sm-0 px-2" id="dropdown"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span
                            className="ms-1 d-none d-sm-inline">Stories</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#">Add</a></li>
                            <li><a className="dropdown-item" href="#">Search</a></li>
                        </ul>
                    </li>
                </ul>
                {/*<div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle"/>
                            <span className="d-none d-sm-inline mx-1">Joe</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>*/}
            </div>
        </div>
    );

}