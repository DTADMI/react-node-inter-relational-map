import React, {useContext, useEffect, useRef, useState} from 'react';
import {IMapCard} from "../../../interfaces";
import mapCardContext from "../../../contexts/MapCardContext";
import MapService from "../../../services/MapService";
import {useNavigate} from "react-router-dom";

export interface IMapCardProps extends IMapCard {}

export const MapCard = (props: React.PropsWithChildren<IMapCardProps>) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState('');
    let name = props.name;
    let description = props.description;
    const owner = props.owner;
    const people = props.people;
    const imgSrc = props.imgSrc;
    let isCreated = name !== "";

    const {
        setCardInCreation,
        mapCards,
        setMapCards,
        setCurrentMap
    } = useContext(mapCardContext);
    const [isCreateBtnDisabled, setIsCreateBtnDisabled] = useState(true);
    const navigate = useNavigate();

    const handleCreateMapCard = () => {
        let nameInput = nameRef?.current?.value ?? "";

        if(nameInput) {
            if(!mapCards.has(nameInput)) {
                let newMapCards = new Map(Array.from(mapCards));
                name = nameInput;
                description = descriptionRef?.current?.value ?? "";
                MapService.addMapCard({owner, name, description, people, imgSrc} as IMapCard)
                    .then((response)=>{
                    return response.json();
                }).then((mapCard: IMapCard)=>{
                    newMapCards.set(nameInput, mapCard);
                    setMapCards(newMapCards);
                    isCreated = true;
                    setCardInCreation(false);
                }).catch((error) => {
                    console.error(`Error while creating map : ${JSON.stringify(error)}`);
                });
            } else {
                setError(`Another map was already named "${name}". \n You must provide a unique map name.`)
            }
        }
    }

    const handleCancelMapCardCreation = (e: React.FormEvent) => {
        e.preventDefault();
        setCardInCreation(false);
    }

    const handleMapNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setIsCreateBtnDisabled(event.target.value==="");
    }
    const handleEditMapCard = () => {
        let mapCard = mapCards.get(name);
        if(mapCard) {
            setCurrentMap(mapCard);
            navigate("/maps");
        }
    }
    const handleDeleteMapCard = () => {
        if( prompt(`Are you sure you want to delete this map?`) !== null ) {
            //MapService.deleteMapCard()
            let newMapCards = new Map(Array.from(mapCards));
            newMapCards.delete(name);
            setMapCards(newMapCards);
        }
    }

    useEffect(() => {
        if(!isCreated && nameRef){
            nameRef.current?.focus();
        }
    });

    return (
        <div className="{/*col-md-4*/} col-12 col-md-6 col-lg-4">
            <div className="card">
                {imgSrc && <img className="card-img-top" src={imgSrc} alt="Card caption"/>}
                <div className="card-body">
                    {!isCreated &&
                        <h6 className="card-title">
                            <div className="form-group row">
                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="mapName" name="mapName"
                                           placeholder="Your map name" ref={nameRef} onChange={handleMapNameChange}
                                           required/>
                                </div>
                            </div>
                        </h6>
                    }
                    {isCreated && <h6 className="card-title">{name}</h6>}

                    {!isCreated && <div className="card-text mb-3">
                        <div className="form-group row">
                            <div className="col-md-12">
                                <textarea className="form-control" id="mapDescription" name="mapDescription"
                                          placeholder="Your relationship map description" ref={descriptionRef}/>
                            </div>
                        </div>
                    </div>}
                    {isCreated && description && <p className="card-text">{description}</p>}
                    {!isCreated &&
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" onClick={handleCreateMapCard}
                                    disabled={isCreateBtnDisabled}>Create
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelMapCardCreation}>Cancel</button>
                        </div>
                    }
                    {isCreated &&
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" onClick={handleEditMapCard}>Edit map</button>
                            <button className="btn btn-secondary" onClick={handleDeleteMapCard}>Delete map</button>
                        </div>
                    }
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};
