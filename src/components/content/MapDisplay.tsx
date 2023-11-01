import React, {FormEvent, useContext, useEffect, useState} from 'react';
import "./MapDisplay.css";
import mapCardContext from "../../contexts/MapCardContext";
import {useNavigate} from "react-router-dom";
import Flow from "../flow/Flow";
import qs from "qs";
import { createBrowserHistory } from "history";
import MapService from "../../services/MapService";
import authContext from "../../contexts/AuthContext";
import {IMapCard, INodeData, IEdgeData, IPersonCard} from "../../interfaces";
import PersonForm from "./PersonForm";
import PersonService from "../../services/PersonService";

export const MapDisplay = () => {

    const {
        currentUser,
        setCurrentUser
    } = useContext(authContext);

    const {
        currentMap,
        setCurrentMap,
        isPersonInCreation,
        setPersonInCreation
    } = useContext(mapCardContext);

    const [isPageLoading, setPageLoading] = useState(true);
    const [nodesData, setNodesData] = useState([] as INodeData[]);
    const [edgesData, setEdgesData] = useState([] as IEdgeData[]);
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const startingXPosition = 550;
    const startingYPosition = 50;
    const moveRadiusX = 100;
    const moveRadiusY = 100;


    useEffect(() => {
        if(isPageLoading && (!currentUser.userId || !currentMap.id)) {
            const filterParams = history.location.search.substring(1);
            const filtersFromParams = qs.parse(filterParams);
            if(!currentUser.userId) {
                if (filtersFromParams.user) {
                    setCurrentUser({userId: filtersFromParams.user as string});
                }
            }

            if(!currentMap.id){
                if (filtersFromParams.mapId) {
                    MapService.getMapCardById(filtersFromParams.mapId as string)
                        .then((response) => {
                            return response.json();
                        }).then((data: IMapCard) => {
                        setCurrentMap(data)
                    }).finally(()=>{
                        setPageLoading(false);
                    });
                } else {
                    alert("No map is currently selected. Create a map and edit it, or select an existing one.");
                    setPageLoading(false);
                    navigate("/home");
                }

            }
        } else {
            setPageLoading(false);
        }
    }, []);

    useEffect(() => {
        if(!isPageLoading){
            history.push(`?user=${currentUser.userId}&mapId=${currentMap.id}`);
        }
    }, [currentUser, currentMap, isPageLoading]);

    const handleAddPerson = (e: FormEvent) => {
        e.preventDefault();
        setPersonInCreation(true);

    };


    useEffect(() => {
        if(!isPageLoading && currentMap.name){
            if(currentMap.people.length > 0){
                let newNodes = [] as INodeData[];
                currentMap.people.forEach((personId: string, idx, arr) => {
                    PersonService.getPersonCardById(personId)
                        .then((response) => {
                            return response.json();
                        })
                        .then((personData: IPersonCard) => {
                            const newNode = {
                                id: personData.id,
                                data: { label : personData.names?.length>0 ? personData.names.join(',') : personData.id },
                                position: {
                                    x: (idx % 2 === 0) ? (startingXPosition + (idx * moveRadiusX)) : (startingXPosition + (idx * moveRadiusX + moveRadiusX)),
                                    y: (startingYPosition + (idx * moveRadiusY + moveRadiusY))
                                },
                                type: "input"
                            } as INodeData;
                            newNodes.push(newNode);
                            if(idx === arr.length-1){
                                setNodesData(newNodes);
                            }
                        });
                });
            }
        }
    }, [isPageLoading, currentMap]);

    useEffect(() => {
        if(!isPageLoading && !currentMap.name){
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
                                        <h3  className="left-side-title-input left-side-content-wrapper">{currentMap.name}</h3>
                                    </div>
                                </div>
                                <div className="left-side-content-wrapper">
                                    <div className="actions-menu">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col text-center">
                                                    <button type="button" className="btn btn-light" onClick={handleAddPerson}>Add Person</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isPersonInCreation && <PersonForm />
                                    }

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
                        {currentMap?.people?.length === 0 &&
                            <div className="actions-menu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="button" className="btn btn-light" onClick={handleAddPerson}>Add Person</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="scroll-wrapper">
                            <div style={{ width: "200vh", height: "100vh" }}>
                                <Flow nodesData={nodesData} edgesData={edgesData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
