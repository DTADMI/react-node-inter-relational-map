import React, {FormEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import "./MapDisplay.css";
import mapCardContext from "../../contexts/MapCardContext";
import {useNavigate} from "react-router-dom";
import Flow from "../flow/Flow";
import qs from "qs";
import { createBrowserHistory } from "history";
import MapService from "../../services/MapService";
import authContext from "../../contexts/AuthContext";
import {IMapCard, IPersonCard, IRelationCard} from "../../interfaces";
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

    const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)), []);


    const navigate = useNavigate();
    const history = createBrowserHistory();
    const startingXPosition = 550;
    const startingYPosition = 50;
    const moveRadiusX = 100;
    const moveRadiusY = 100;

    const memoEdges = useMemo(
        () => (edges),
        [edges]
    );
    const memoNodes = useMemo(
        () => (nodes),
        [nodes]
    );
    const memoCurrentMap = useMemo(
        () => (currentMap),
        [currentMap]
    );
    const memoCurrentUser = useMemo(
        () => (currentUser),
        [currentUser]
    );


    useEffect(() => {
        if(isPageLoading && (!memoCurrentUser.userId || !memoCurrentMap.id)) {
            const filterParams = history.location.search.substring(1);
            const filtersFromParams = qs.parse(filterParams);
            if(!memoCurrentUser.userId) {
                if (filtersFromParams.user) {
                    setCurrentUser({userId: filtersFromParams.user as string});
                }
            }

            if(!memoCurrentMap.id){
                if (filtersFromParams.mapId) {
                    MapService.getMapCardById(filtersFromParams.mapId as string)
                        .then((response) => {
                            return response.json();
                        }).then((dataMap: IMapCard) => {
                        setCurrentMap(dataMap);
                        if(dataMap?.relationships?.size > 0){
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
                    }).catch((error)=>{
                      console.error("Error while getting map id id");
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
            history.push(`?user=${memoCurrentUser.userId}&mapId=${memoCurrentMap.id}`);
        }
    }, [memoCurrentUser, memoCurrentMap, isPageLoading]);

    const handleAddPerson = (e: FormEvent) => {
        e.preventDefault();
        setPersonInCreation(true);
    };


    useEffect(() => {
        if(!isPageLoading && memoCurrentMap.name){
            if(memoCurrentMap?.people?.length > 0){
                let newNodes = [] as Node[];
                memoCurrentMap.people.forEach((personId: string, idx, arr) => {
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
        }
    }, [isPageLoading, memoCurrentMap]);


    useEffect(() => {
        if(!isPageLoading && memoEdges?.length >0){
            const newRels = new Set(memoEdges.map((ed) => {
                return [ed.source, ed.target].join(":");
            }));
            const newMap = {...memoCurrentMap};
            newMap.relationships = newRels;
            setCurrentMap(newMap);
        }
    }, [memoEdges]);

    useEffect(() => {
        if(!isPageLoading ){
            const newRelCards = new Set(memoEdges.map((ed) => {
                return {
                    personSourceId: ed.source,
                    personTargetId: ed.target
                } as IRelationCard;
            }));
            newRelCards.forEach((relCard: IRelationCard)=>{
                RelationService.addRelationCard(relCard)
                    .then((response)=>{
                        return response.json();
                    }).then((relation: IRelationCard)=>{
                        console.log(`Relationship created : ${JSON.stringify(relation)}`);
                    }).catch((error) => {
                        console.error(`Error while creating relationships : ${JSON.stringify(error)}`);
                    });
            });

            const newRels = new Set(memoEdges.map((ed) => {
                return [ed.source, ed.target].join(":");
            }));
            const newMap = {...memoCurrentMap};
            newMap.relationships = newRels;
            MapService.updateMapCard(newMap)
                .then((response)=>{
                    return response.json();
                })
                .then((mapData: IMapCard) => {
                    console.log(`map updated to ${JSON.stringify(mapData)}`);
                });

        }
    }, [isPageLoading, memoEdges]);


    useEffect(() => {
        if(!isPageLoading && !memoCurrentMap.name){
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
                                        <h3  className="left-side-title-input left-side-content-wrapper">{memoCurrentMap.name}</h3>
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
                </div>
                <div className="content-wrapper">
                    <div></div>
                    <div className="display-container">
                        {memoCurrentMap?.people?.length === 0 &&
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
                                <Flow nodesData={nodes} edgesData={edges} setNodes={setNodes} setEdges={setEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
