import React, {useContext, useEffect} from 'react';
import "./MapDisplay.css";
import {MapCard} from "./MapCard";
import mapCardContext from "../../contexts/MapCardContext";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const MapDisplay = () => {

    const {
        mapCards,
        setMapCards,
        currentMap,
        setCurrentMap
    } = useContext(mapCardContext);

    const navigate = useNavigate();

    const handleAddPerson = () => {

    };

    useEffect(() => {
        if(!currentMap.mapName){
            alert("No map is currently selected. Create a map and edit it, or select an existing one.");
            navigate("/home");
        }
    }, []);

    return (
        <>
            <div className="main-container">
                <div className="side-wrapper">
                    <div className="side-container">
                        <div className="left-side-wrapper">
                            <div className="left-side-container">
                                <div className="left-side-title-container left-side-title-adjustments">
                                    <div className="left-side-title-input-container">
                                        <input disabled className="left-side-title-input left-side-content-wrapper" value={currentMap.mapName}/>
                                    </div>
                                </div>
                                <div className="left-side-content-wrapper">

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<Form className="d-grid gap-3">
                        <Button onClick={() => { navigate("/solomode")}}>Solo Mode</Button>
                        <Button onClick={() => { navigate("/multiplayermode")}}>2 players Mode</Button>
                    </Form>*/}
                </div>
                <div className="content-wrapper">
                    <div></div>
                    <div className="display-container">
                        <div className="actions-menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <button type="button" className="btn btn-light" onClick={handleAddPerson} >Add Person</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*{isMapEmpty &&
                            <div className="actions-menu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="button" className="btn btn-light" onClick={handleAddPerson} disabled={isCardInCreation}>Add Person</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }*/}
                        <div className="scroll-wrapper">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
