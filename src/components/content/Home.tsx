import React, {useContext, useEffect, useState} from 'react';
import authContext from "../../contexts/AuthContext";
import mapCardContext from "../../contexts/MapCardContext";
import "./Home.css"
import {MapCard} from "./MapCard";
import {IMapCard, IRelationCard} from "../../interfaces";
import MapService from "../../services/MapService";

export interface IHomeProps {}
const Home: React.FunctionComponent<IHomeProps> = (props: React.PropsWithChildren<IHomeProps>) => {
    const {
        currentUser
    } = useContext(authContext);
    const {
        isCardInCreation,
        setCardInCreation,
        mapCards,
        setMapCards,
        setCurrentMap
    } = useContext(mapCardContext);
    const [newImgSrc, setImgSrc] = useState("https://picsum.photos/180/100");

    const handleAddMap = (e: React.FormEvent) => {
        e.preventDefault();
        setCardInCreation(true);
    }

    useEffect(() => {
        if(currentUser.userId){
            MapService.getOwnedMapCards(currentUser.userId)
                .then((response)=>{
                    return response.json();
                })
                .then((data: IMapCard[])=>{
                    let newMapOfCards = new Map<string, IMapCard>;
                    data.forEach((card)=>{
                        newMapOfCards.set(card.name, card);
                    });
                    setMapCards(newMapOfCards);
                }).catch((error) => {
                    console.error(`Error while getting owned maps : ${JSON.stringify(error)}`);
                });
        }
        setCurrentMap({} as IMapCard);
    }, [currentUser, isCardInCreation]);

    return (
        <>
            {
                !!currentUser.userId &&
                <div className="display-container">
                    <div className="actions-menu">
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-dark" onClick={handleAddMap} disabled={isCardInCreation}>Add Map</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-wrapper">
                        <div className="container">
                            <div id="mapCards" className="row {/*row-cols-1 row-cols-md-3*/}">
                                {Array.from(mapCards.values()).map((card, cardIdx) => (
                                    <MapCard owner={currentUser.userId} id={card.id} name={card.name} description={card.description} key={card.name} imgSrc={newImgSrc} people={card.people} relationships={card.relationships} />
                                ))}
                                {isCardInCreation &&
                                    <MapCard owner={currentUser.userId} name="" description="" imgSrc={newImgSrc} people={[] as string[]} relationships={new Set<string>}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Home;
