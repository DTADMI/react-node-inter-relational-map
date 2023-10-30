import React, {useContext, useEffect, useState} from 'react';
import authContext from "../../contexts/AuthContext";
import mapCardContext from "../../contexts/MapCardContext";
import "./Home.css"
import {MapCard} from "./MapCard";
import {IMapCard} from "../../interfaces";

export interface IHomeProps {}
const Home: React.FunctionComponent<IHomeProps> = (props: React.PropsWithChildren<IHomeProps>) => {
    const {
        currentUser
    } = useContext(authContext);
    const {
        isCardInCreation,
        setCardInCreation,
        mapCards,
        setCurrentMap
    } = useContext(mapCardContext);
    const [newImgSrc, setImgSrc] = useState("https://picsum.photos/180/100");

    const handleAddMap = (e: React.FormEvent) => {
        e.preventDefault();
        setCardInCreation(true);
    }

    useEffect(() => {
        setCurrentMap({} as IMapCard);
    }, []);

    return (
        <>
            {
                Object.keys(currentUser).length !== 0 &&
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
                                    <MapCard mapName={card.mapName} mapDescription={card.mapDescription} key={card.mapName} imgSrc={newImgSrc} />
                                ))}
                                {isCardInCreation &&
                                    <MapCard mapName="" mapDescription="" imgSrc={newImgSrc} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Home
