import React, {FormEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import "./MapDisplay.css";
import mapCardContext from "../../contexts/MapCardContext";
import {useNavigate} from "react-router-dom";
import Flow from "../flow/Flow";
import qs from "qs";
import { createBrowserHistory } from "history";
import MapService from "../../services/MapService";
import authContext from "../../contexts/AuthContext";
import {IMapCardSerialized, IMapCardUnserialized, IPersonCard, IRelationCard, IUser} from "../../interfaces";
import PersonForm from "./PersonForm";
import PersonService from "../../services/PersonService";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    EdgeChange,
    Node,
    NodeChange,
} from "reactflow";
import {Connection, Edge} from "@reactflow/core/dist/esm/types";
import RelationService from "../../services/RelationService";
import {serializeMapCardObject, unserializeMapCardObject} from "../../common/functions";

const LOCAL_STORAGE_KEY = "CURRENT_USER";

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

    const getCurrentUser = () => {
        if(!currentUser.userId) {
            const localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localUser) {
                return JSON.parse(localUser) as IUser;
            }
        }
        return currentUser;
    }

    const getMapById = (mapId: string) => {
        return MapService.getMapCardById(mapId)
            .then((response) => {
                return response.json();
            })
            .then((dataMap: IMapCardSerialized) => {
                return unserializeMapCardObject(dataMap);
            })
            .catch((error)=>{
                console.error(`Error while getting map id id: ${JSON.stringify(error)}`);
                return {} as IMapCardUnserialized;
            })
    }

    const getCurrentMap = (callback: (map: IMapCardUnserialized) => void) => {
        if(!currentMap.id) {
            const filterParams = history.location.search.substring(1);
            const filtersFromParams = qs.parse(filterParams);
            if (filtersFromParams.mapId) {
                getMapById(filtersFromParams.mapId as string)
                    .then((data) => {
                        callback(data);
                    })
            } else {
                alert("No map is currently selected. Create a map and edit it, or select an existing one.");
                callback({} as IMapCardUnserialized);
            }

        } else {
            callback(currentMap);
        }


    }

    const [isPageLoading, setPageLoading] = useState(true);

    const [nodes, setNodes] = useState([] as Node[]);
    const [edges, setEdges] = useState([] as Edge[]);


    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)), []);

    const navigate = useNavigate();
    const history = createBrowserHistory();
    const createEdges = (dataMap: IMapCardUnserialized) => {
        let newEdges = [] as Edge[];
        Array.from(dataMap.relationships).forEach((relationId: string, idx, arr) => {
            RelationService.getRelationCardById(relationId)
                .then((response) => {
                    return response.json();
                })
                .then((relationData: IRelationCard) => {
                    const newEdge = {
                        id: relationData.id,
                        source: relationData.personSourceId,
                        target: relationData.personTargetId,
                        type: relationData.relationType ?? ""
                    } as Edge;
                    newEdges.push(newEdge);
                    if(idx === arr.length-1){
                        setEdges(newEdges);
                    }
                }).catch((error) => {
                console.error(`Error while getting relationships : ${JSON.stringify(error)}`);
            });
        });
    }
    const createNodes = (dataMap : IMapCardUnserialized) => {
        let newNodes = [] as Node[];
        dataMap.people.forEach((personId: string, idx, arr) => {
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
                        type: idx === 0 ? "input" : ""
                    } as Node;
                    newNodes.push(newNode);
                    if(idx === arr.length-1){
                        setNodes(newNodes);
                    }
                }).catch((error) => {
                console.error(`Error while getting people : ${JSON.stringify(error)}`);
            });
        });
    }

    const startingXPosition = 550;
    const startingYPosition = 50;
    const moveRadiusX = 100;
    const moveRadiusY = 100;

    const memoEdges = useMemo(
        () => (edges),
        [edges]
    );
    const memoCurrentMap = useMemo(
        () => (currentMap),
        [currentMap]
    );

    useEffect(() => {
        if(!isPageLoading && !memoCurrentMap.name){
            alert("No map is currently selected. Create a map and edit it, or select an existing one.");
            navigate("/home");
        }
    }, []);

    useEffect(() => {

        if(isPageLoading) {
            setCurrentUser(getCurrentUser());
            const callback = (map: IMapCardUnserialized) => {
                if(Object.keys(map).length){
                    setCurrentMap(map);
                    setPageLoading(false);
                } else {
                    alert("No map is currently selected. Create a map and edit it, or select an existing one.");
                    setPageLoading(false);
                    navigate("/home");
                }
            }
            getCurrentMap(callback);

            if(!Object.keys(currentUser).length) {
                alert("User disconnected");
                setPageLoading(false);
                navigate("/home");
            }

        }
    }, []);

    useEffect(() => {
        if(isPageLoading && Object.keys(memoCurrentMap).length){
            history.push(`?mapId=${memoCurrentMap.id}`);
        }
    }, [memoCurrentMap, isPageLoading]);

    const handleAddPerson = (e: FormEvent) => {
        e.preventDefault();
        setPersonInCreation(true);
    };


    useEffect(() => {
        if(isPageLoading && memoCurrentMap.name){
            if(memoCurrentMap?.relationships?.size > 0){
                createEdges(currentMap);
            }
        }
    }, [isPageLoading, memoCurrentMap]);

    useEffect(() => {
        if((isPageLoading || !isPersonInCreation) && memoCurrentMap.name){
            if(memoCurrentMap?.people?.length > 0){
                createNodes(currentMap);
            }
        }
    }, [isPageLoading, isPersonInCreation]);


    useEffect(() => {
        if(!isPageLoading && memoEdges?.length >0) {
            const newRelations = new Set(memoEdges.map((ed) => {
                return [ed.source, ed.target].join(":");
            }));
            const newRelCards = new Set(memoEdges.map((ed) => {
                return {
                    personSourceId: ed.source,
                    personTargetId: ed.target
                } as IRelationCard;
            }));
            Array.from(newRelCards).filter((relCard)=> {
                return !currentMap.relationships.has([relCard.personSourceId, relCard.personTargetId].join(":"));
            }).forEach((relCard: IRelationCard)=>{
                RelationService.addRelationCard(relCard)
                    .then((response)=>{
                        return response.json();
                    }).then((relation: IRelationCard)=>{
                    console.log(`Relationship created : ${JSON.stringify(relation)}`);
                }).catch((error) => {
                    console.error(`Error while creating relationships : ${JSON.stringify(error)}`);
                });
            });

            const serializedMapCard = serializeMapCardObject(memoCurrentMap, newRelations);//{...baseCard, relationships: Array.from(newRelations)} as IMapCardSerialized; // Replaces the previous set of relationships instead of checking what previously existed and updating them

            MapService.updateMapCard(serializedMapCard)
                .then((response)=>{
                    return response.json();
                })
                .then((mapData: IMapCardSerialized) => {
                    console.log(`map updated to ${JSON.stringify(mapData)}`);
                });
            const unserializedMapCard = unserializeMapCardObject(serializedMapCard)//{...baseCard, relationships: new Set(relationships)};
            setCurrentMap(unserializedMapCard);
        }
    }, [isPageLoading, memoEdges]);

    return (
        <div className="main-container">
            <div className="side-wrapper">
                <div className="side-container">
                    <div className="left-side-wrapper">
                        <div className="left-side-container">
                            <div className="left-side-title-container left-side-title-adjustments">
                                <div className="left-side-title-input-container">
                                    <h3 className="left-side-title-input left-side-content-wrapper">{currentMap.name}</h3>
                                </div>
                            </div>
                            <div className="left-side-content-wrapper">
                                <div className="actions-menu">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <button type="button" className="btn btn-light"
                                                        onClick={handleAddPerson}>Add Person
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    isPersonInCreation && <PersonForm/>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-wrapper">
                <div></div>
                <div className="display-container">
                    {currentMap?.people?.length === 0 &&
                        <div className="actions-menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <button type="button" className="btn btn-light" onClick={handleAddPerson}>Add
                                            Person
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="scroll-wrapper">
                        <div style={{width: "200vh", height: "100vh"}}>
                            <Flow nodesData={nodes} edgesData={edges} setNodes={setNodes} setEdges={setEdges}
                                  onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
