import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import "./MapDisplay.css";
import mapCardContext from "../../../contexts/MapCardContext";
import {useNavigate} from "react-router-dom";
import Flow from "../../flow/Flow";
import qs from "qs";
import { createBrowserHistory } from "history";
import MapService from "../../../services/MapService";
import authContext from "../../../contexts/AuthContext";
import {
    IMapCard,
    IPersonCard,
    IRelationCard,
    IUser
} from "../../../interfaces";
import PersonService from "../../../services/PersonService";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    EdgeChange,
    Node,
    NodeChange,
} from "reactflow";
import {Connection, Edge} from "@reactflow/core/dist/esm/types";
import RelationService from "../../../services/RelationService";
import {MapsActionMenu} from "../../nav/MapsActionMenu/MapsActionMenu";
import {PacmanLoader} from "react-spinners";

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
        loadingCssOverride
    } = useContext(mapCardContext);

    const [isMapDataFetching, setIsMapDataFetching] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [currentMapRelationships, setCurrentMapRelationships] = useState(new Set<string>());

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
    const memoCurrentMapRelationships = useMemo(
        () => (currentMapRelationships),
        [currentMapRelationships]
    );
    const navigate = useNavigate();
    const history = createBrowserHistory();

    const handleNoMapError = useCallback(
        () => {
            alert("No map is currently selected. Create a map and edit it, or select an existing one.");
            navigate("/home");
        },
        [navigate],
    );

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
            .then((dataMap: IMapCard) => {
                return dataMap;
            })
            .catch((error)=>{
                console.error(`Error while getting map by id: ${JSON.stringify(error)}`);
                return {} as IMapCard;
            })
    }

    const getRelationshipsByMapId = (mapId: string) => {
        return RelationService.getRelationshipsInMap(mapId)
            .then((response) => {
                return response.json();
            })
            .then((relationships: IRelationCard[]) => {
                return relationships;
            })
            .catch((error)=>{
                console.error(`Error while getting relationships by mapId: ${JSON.stringify(error)}`);
                return [] as IRelationCard[];
            })
    }

    const setCurrentRelationshipsFromMap = (dataMap: IMapCard, callback: (map: IMapCard) => void) => {
        if(dataMap.id){
            const mapId = dataMap.id;
            getRelationshipsByMapId(mapId)
                .then((relationships: IRelationCard[])=>{
                    setCurrentMapRelationships(new Set<string>(relationships.map(relationship => relationship.id ?? [relationship.personSourceId, relationship.personTargetId].join(':'))));
                    callback(dataMap);
                });
        }
    }

    const getCurrentMapData = (callback: (map: IMapCard) => void) => {
        if(!currentMap.id) {
            const filterParams = history.location.search.substring(1);
            const filtersFromParams = qs.parse(filterParams);
            if (filtersFromParams.mapId) {
                getMapById(filtersFromParams.mapId as string)
                    .then((dataMap) => {
                        if(dataMap?.id) {
                            setCurrentRelationshipsFromMap(dataMap, callback);
                        } else {
                            handleNoMapError();
                        }
                    })
            } else {
                handleNoMapError();
            }
        } else {
            setCurrentRelationshipsFromMap(currentMap, callback);
        }


    }

    const createEdges = () => {
        if( Array.from(memoCurrentMapRelationships).length > 0) {
            //let newEdges = [] as Edge[];
            const edgesCreatePromises = Array.from(memoCurrentMapRelationships)
                .filter((relationship)=>relationship.includes(':') && currentMap.people.includes(relationship.split(':')[0]) && currentMap.people.includes(relationship.split(':')[1]))
                .map((relationId: string) => {
                    return RelationService.getRelationCardById(relationId)
                        .then((response) => {
                            return response.json();
                        })
                        .then((relationData: IRelationCard) => {
                            return {
                                id: relationData.id,
                                source: relationData.personSourceId,
                                target: relationData.personTargetId,
                                type: relationData.relationType ?? ""
                            } as Edge;
                        })
                        .catch((error) => {
                            console.error(`Error while getting relationships : ${JSON.stringify(error)}`);
                            throw new Error(`Error while getting relationships : ${JSON.stringify(error)}`);
                        });
                });
            Promise.all(edgesCreatePromises)
                .then((newEdges) => {
                    if(newEdges){
                        setEdges(newEdges);
                    }
                })
                .catch((error) => {
                    console.error(`Error while getting relationships : ${JSON.stringify(error)}`);
                    throw new Error(`Error while getting relationships : ${JSON.stringify(error)}`);
                });
        }
    }
    const createNodes = () => {
        //let newNodes = [] as Node[];
        const nodesCreatePromises = currentMap.people.map((personId: string, idx) => {
            return PersonService.getPersonCardById(personId)
                .then((response) => {
                    return response.json();
                })
                .then((personData: IPersonCard) => {
                    return {
                        id: personData.id,
                        data: { label : personData.names?.length>0 ? personData.names.join(', ') : personData.id },
                        position: {
                            x: (idx % 2 === 0) ? (startingXPosition + (idx * moveRadiusX)) : (startingXPosition + (idx * moveRadiusX + moveRadiusX)),
                            y: (startingYPosition + (idx * moveRadiusY + moveRadiusY))
                        },
                        type: idx === 0 ? "input" : ""
                    } as Node;
                })
                .catch((error) => {
                    console.error(`Error while getting people : ${JSON.stringify(error)}`);
                    throw new Error(`Error while getting people : ${JSON.stringify(error)}`);
                });
        });
        Promise.all(nodesCreatePromises)
            .then((newNodes) => {
                if(newNodes){
                    setNodes(newNodes);
                    if(!Array.from(memoCurrentMapRelationships).length) {
                        setIsPageLoading(false);
                    }
                }
            })
            .catch((error) => {
                console.error(`Error while getting people : ${JSON.stringify(error)}`);
                throw new Error(`Error while getting people : ${JSON.stringify(error)}`);
            });
    }

    useEffect(() => {
        if(!isMapDataFetching && !memoCurrentMap.name){
            handleNoMapError();
        }
    }, []);

    useEffect(() => {
        if(isMapDataFetching) {
            setCurrentUser(getCurrentUser());
            const setCurrentMapData = (map: IMapCard) => {
                if(Object.keys(map).length){
                    setCurrentMap(map);
                    setIsMapDataFetching(false);
                } else {
                    setIsMapDataFetching(false);
                    handleNoMapError();
                }
            }
            getCurrentMapData(setCurrentMapData);

            if(!Object.keys(currentUser).length) {
                alert("User disconnected");
                setIsMapDataFetching(false);
                navigate("/home");
            }
        }
    }, []);

    useEffect(() => {
        if(isMapDataFetching && Object.keys(memoCurrentMap).length){
            history.push(`?mapId=${memoCurrentMap.id}`);
        }
    }, [memoCurrentMap, isMapDataFetching]);

    useEffect(() => {
        if((isMapDataFetching || !isPersonInCreation) && memoCurrentMap.name){
            if(memoCurrentMap?.people?.length > 0){
                createNodes();
            }
        }
    }, [isMapDataFetching, isPersonInCreation, memoCurrentMapRelationships.size]);

    useEffect(() => {
        if(isMapDataFetching && memoCurrentMap.name){
            createEdges();
        }
    }, [isMapDataFetching, memoCurrentMap, memoCurrentMapRelationships]);


    useEffect(() => {
        if(!isMapDataFetching) {
            if(memoEdges?.length >0) {
                const newRelCards = new Set(memoEdges.map((ed) => {
                    return {
                        personSourceId: ed.source,
                        personTargetId: ed.target,
                        mapId: currentMap.id
                    } as IRelationCard;
                }));
                const relationsCreatePromise = Array.from(newRelCards).filter((relCard)=> {
                    return (memoCurrentMapRelationships && !memoCurrentMapRelationships.has([relCard.personSourceId, relCard.personTargetId].join(":"))) || false;
                }).map((relCard: IRelationCard)=>{
                    return RelationService.addRelationCard(relCard)
                        .then((response)=>{
                            return response.json();
                        })
                        .then((relation: IRelationCard)=>{
                            return relation;
                    }).catch((error) => {
                        console.error(`Error while creating relationships : ${JSON.stringify(error)}`);
                        throw new Error(`Error while creating relationships : ${JSON.stringify(error)}`);
                    });
                });
                Promise.all(relationsCreatePromise)
                    .then((newRelations) => {
                        if(newRelations.length){
                            newRelations.forEach((relation)=>setCurrentMapRelationships((relations) => {
                                relations.add(relation.id ?? [relation.personSourceId, relation.personTargetId].join(':'));
                                return relations;
                            }));
                        }
                        if(isPageLoading){
                            setIsPageLoading(false);
                        }
                    })
                    .catch((error) => {
                        console.error(`Error while creating relationships : ${JSON.stringify(error)}`);
                        throw new Error(`Error while creating relationships : ${JSON.stringify(error)}`);
                    });
            }
        }
    }, [isMapDataFetching, memoEdges]);

    return (
        <>
            {
                isPageLoading ?
                    <PacmanLoader
                        color="#6430d1"
                        loading={isPageLoading}
                        cssOverride={loadingCssOverride}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> :
                    <div className="container-fluid overflow-hidden" style={{ position: "fixed", top: "3.9rem", bottom: "1.8rem" }}>
                        <div className="row vh-100 overflow-auto" style={{ maxHeight: "90.3vh", backgroundColor: "lightblue" }}>
                            <MapsActionMenu />
                            <div className="scroll-wrapper col d-flex flex-column h-100" style={{ maxHeight: "90vh" }}>
                                <div className="column" style={{ position: "fixed", top: "3.9rem", bottom: "1.8rem", maxWidth: "90vh" }}>
                                    <div className="col text-center map-title-wrapper">
                                        <h3>{currentMap.name}</h3>
                                    </div>
                                    <div style={{width: "200vh", height: "90vh"}}>
                                        <Flow nodesData={nodes} edgesData={edges} setNodes={setNodes} setEdges={setEdges}
                                              onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};
