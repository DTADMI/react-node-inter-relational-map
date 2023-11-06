import React from "react";
import {Button} from "react-bootstrap";
import {BtnAddMap} from "../../content/BtnAddMap/BtnAddMap";

export const HomeActionMenu = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ position: "fixed", top: "3.9rem", right: "0", left: "0", zIndex: "1030" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <BtnAddMap/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<nav className="navbar navbar-dark bg-dark" style={{ position: "fixed", top: "3.9rem", right: "0", left: "0", zIndex: "1030" }}>
                <div className="container-fluid">

                    <div className="offcanvas offcanvas-start text-bg-dark"  id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{top: "3.9rem"}}>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Offcanvas dark navbar</a>
                </div>
            </nav>*/}
           {/* <nav className="navbar navbar-expand-sm navbar-light bg-dark navbar-dark" style={{ position: "fixed", top: "3.9rem", right: "0", left: "0", zIndex: "1030" }}>
                <!-- Container wrapper -->
                <div className="container-fluid">
                    <!-- Left links -->
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-2 me-lg-0">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="nav-link text-white btn shadow-0 p-0 me-3" href="#" role="button" data-mdb-toggle="sidenav" data-mdb-target="#sidenav-1" aria-controls="#sidenav-1" aria-haspopup="true">
                                <i className="fas fa-bars me-1"></i>
                            </a>
                        </li>
                        <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                            <a className="navbar-brand">Material Design for Bootstrap</a>
                        </li>
                    </ul>
                    <!-- Left links -->

                    <ul className="navbar-nav d-flex flex-row me-1">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-envelope me-1"></i>Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-comments me-1"></i>Support</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-user-alt me-1"></i>Account</a>
                        </li>
                        <!-- Dropdown -->
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <!-- Dropdown menu -->
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">Action</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- Container wrapper -->
            </nav>*/}
            {/*<nav className="navbar second-navbar fixed-top navbar-expand-sm navbar-light bg-primary navbar-dark">
                <!-- Container wrapper -->
                <div className="container-fluid">
                    <!-- Left links -->
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-2 me-lg-0">
                            <a className="nav-link text-white btn shadow-0 p-0 me-3" href="#" role="button" data-mdb-toggle="sidenav" data-mdb-target="#sidenav-1" aria-controls="#sidenav-1" aria-haspopup="true">
                                <i className="fas fa-bars me-1"></i>
                            </a>
                        </li>
                        <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                            <a className="navbar-brand">Material Design for Bootstrap</a>
                        </li>
                    </ul>
                    <!-- Left links -->

                    <ul className="navbar-nav d-flex flex-row me-1">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-envelope me-1"></i>Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-comments me-1"></i>Support</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i className="fas fa-user-alt me-1"></i>Account</a>
                        </li>
                        <!-- Dropdown -->
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <!-- Dropdown menu -->
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">Action</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--Container wrapper-->
            </nav>*/}

            {/*<!-- Sidenav -->*/}
            {/*<div id="sidenav-1" className="sidenav" role="navigation" data-mdb-hidden="true" data-mdb-accordion="true">
                <ul className="sidenav-menu">
                    <li className="sidenav-item">
                        <a className="ripple d-flex justify-content-center py-4" style={{borderBottom: "2px solid #f5f5f5"}} href="#!" data-mdb-ripple-color="primary">
                            <img id="MDB-logo" src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.webp" alt="MDB Logo" draggable="false" />
                        </a>
                    </li>

                    <!--social media -->
                    <li className="sidenav-item py-2" style={{borderBottom: "2px solid #f5f5f5"}}>
                        <div className="d-flex justify-content-center">
                            <a href="#"><i className="fab fa-facebook-f mx-2 my-2 text-dark"></i></a>
                            <a href="#"><i className="fab fa-pinterest-p mx-2 my-2 text-dark"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g mx-2 my-2 text-dark"></i></a>
                            <a href="#"><i className="fab fa-twitter mx-2 my-2 text-dark"></i></a>
                        </div>
                        <!--social media -->
                    </li>

                    <li className="sidenav-item p-3" style={{borderBottom: "2px solid #e0e0e0"}}>
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" />
                            <label className="form-label" htmlFor="form1">Search</label>
                        </div>
                    </li>

                    <li className="sidenav-item">
                        <a className="sidenav-link"><i className="fas fa-layer-group pe-3 text-dark"></i><span>Categories</span></a>
                        <ul className="sidenav-collapse">
                            <li className="sidenav-item">
                                <a className="sidenav-link">Dresses</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Shirts</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Jeans</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Shoes</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Accessories</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Jewelry</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidenav-item">
                        <a className="sidenav-link"><i className="fas fa-gem pe-3 text-dark"></i><span>Brands</span></a>
                        <ul className="sidenav-collapse">
                            <li className="sidenav-item">
                                <a className="sidenav-link">Brand 1</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Brand 2</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Brand 3</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Brand 4</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidenav-item">
                        <a className="sidenav-link"><i className="fas fa-gift pe-3 text-dark"></i><span>Discounts</span></a>
                        <ul className="sidenav-collapse">
                            <li className="sidenav-item">
                                <a className="sidenav-link">-70%</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">-50%</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Any</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidenav-item">
                        <a className="sidenav-link"><i className="fas fa-fire-alt pe-3 text-dark"></i><span>Popular</span></a>
                        <ul className="sidenav-collapse">
                            <li className="sidenav-item">
                                <a className="sidenav-link">Jewelry</a>
                            </li>
                            <li className="sidenav-item">
                                <a className="sidenav-link">Snickers</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>*/}
            {/*<!-- Sidenav -->*/}
        </>
    );

}