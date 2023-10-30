import React, {useContext, useEffect, useRef, useState} from 'react';
import { IMapCard} from "../../interfaces";
import mapCardContext from "../../contexts/MapCardContext";
import {useNavigate} from "react-router-dom";

export const MapCard = ({mapName, mapDescription, imgSrc}: IMapCard) => {
    const mapNameRef = useRef<HTMLInputElement>(null);
    const mapDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState('');
    const [oldMapName, setOldMapName] = useState("");
    const [oldMapDescription, setOldMapDescription] = useState("");
    let isCreated = mapName !== "";
    const {
        setCardInCreation,
        mapCards,
        setMapCards,
        currentMap,
        setCurrentMap
    } = useContext(mapCardContext);
    const [isCreateBtnDisabled, setCreateBtnDisabled] = useState(true);
    const navigate = useNavigate();

    const handleCreateMapCard = () => {
        setOldMapName(mapName);
        mapName = mapNameRef?.current?.value ?? "";
        if (mapDescription) {
            setOldMapDescription(mapDescription);
        }
        mapDescription = mapDescriptionRef?.current?.value ?? "";

        if(mapName) {
            if(!mapCards.has(mapName)) {
                let newMapCards = new Map(Array.from(mapCards));
                newMapCards.set(mapName, {mapName, mapDescription});
                setMapCards(newMapCards);
                isCreated = true;
                setCardInCreation(false);
            } else {
                setError(`Another map was already named "${mapName}". \n You must provide a unique map name.`)
            }
        }
    }

    const handleCancelMapCardCreation = (e: React.FormEvent) => {
        e.preventDefault();
        setCardInCreation(false);
    }

    const handleMapNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setCreateBtnDisabled(event.target.value==="");
    }
    const handleEditMapCard = () => {
        let mapCard = mapCards.get(mapName);
        if(mapCard) {
            setCurrentMap(mapCard);
            navigate("/maps");
        }
    }
    const handleDeleteMapCard = () => {
        if( prompt(`Are you sure you want to delete this map?`) !== null ) {
            let newMapCards = new Map(Array.from(mapCards));
            newMapCards.delete(mapName);
            setMapCards(newMapCards);
        }
    }

    useEffect(() => {
        if(!isCreated && mapNameRef){
            mapNameRef.current?.focus();
        }
    });

    return (
        <>
            <div className="{/*col-md-4*/} col-12 col-md-6 col-lg-4">
                <div className="card">
                    {imgSrc && <img className="card-img-top" src={imgSrc} alt="Card image cap"/>}
                    <div className="card-body">
                        {!isCreated &&
                            <h6 className="card-title">
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" id="mapName" name="mapName" placeholder="Your map name" ref={mapNameRef} onChange={handleMapNameChange} required/>
                                    </div>
                                </div>
                            </h6>
                        }
                        {isCreated && <h6 className="card-title">{mapName}</h6>}

                        {!isCreated && <div className="card-text"><div className="form-group row">
                            <div className="col-md-12">
                                <textarea className="form-control" id="mapDescription" name="mapDescription" placeholder="Your relationship map description" ref={mapDescriptionRef}/>
                            </div>
                        </div></div>}
                        {isCreated && mapDescription && <p className="card-text">{mapDescription}</p>}
                        {!isCreated &&
                            <div className="d-grid gap-3">
                                <button className="btn btn-primary"  onClick={handleCreateMapCard} disabled={isCreateBtnDisabled}>Create</button>
                                <button className="btn btn-secondary" onClick={handleCancelMapCardCreation}>Cancel</button>
                            </div>
                            }
                        {isCreated &&
                            <div className="d-grid gap-3">
                                <button className="btn btn-primary" onClick={handleEditMapCard}>Edit map</button>
                                <button className="btn btn-secondary" onClick={handleDeleteMapCard}>Delete map</button>
                            </div>
                        }
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        </>
    );
};
