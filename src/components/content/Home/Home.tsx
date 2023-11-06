import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import authContext from "../../../contexts/AuthContext";
import mapCardContext from "../../../contexts/MapCardContext";
import "./Home.css"
import {MapCard} from "../MapCard/MapCard";
import {IMapCardUnserialized} from "../../../interfaces";
import MapService from "../../../services/MapService";
import {getRandomIntInclusive} from "../../../common/functions";
import {HomeActionMenu} from "../../nav/HomeActionMenu/HomeActionMenu";
import {PacmanLoader} from "react-spinners";
import {calculateRgba} from "react-spinners/helpers/colors";

const generateNewImgSrc = () => {
    let randomInt = getRandomIntInclusive(1, 10);
    return "/images/picsum"+randomInt+"_582-180x100.jpg";
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "fixed",
    top: "50%",
    bottom: "50%",
    left: "50%",
    right: "50%"
};

export interface IHomeProps {}
const Home: React.FunctionComponent<IHomeProps> = (props: React.PropsWithChildren<IHomeProps>) => {
    const {
        currentUser
    } = useContext(authContext);
    const {
        isCardInCreation,
        mapCards,
        setMapCards,
        setCurrentMap
    } = useContext(mapCardContext);
    const [newImgSrc, setNewImgSrc] = useState(generateNewImgSrc());

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const getMapCards = (userId: string) => {
        return MapService.getOwnedMapCards(userId)
            .then((response)=>{
                return response.json();
            })
            .then((data: IMapCardUnserialized[])=>{
                let newMapOfCards = new Map<string, IMapCardUnserialized>();
                data.forEach((card)=>{
                    if(!card.imgSrc) {
                        card.imgSrc = generateNewImgSrc();
                    }
                    newMapOfCards.set(card.name, card);
                });
                return newMapOfCards;
            })
            .catch((error) => {
                console.error(`Error while getting owned maps : ${JSON.stringify(error)}`);
                return new Map<string, IMapCardUnserialized>();
        });
    }

    useEffect(() => {
        const userId = currentUser.userId;
        if(userId) {
            setLoading(true);
            getMapCards(userId).then((maps) => {
                setMapCards(maps);
                setLoading(false);
            });
        }
        setCurrentMap({} as IMapCardUnserialized);
    }, [currentUser, isCardInCreation]);

    return (
        <>
            {
                !!currentUser.userId &&
                <>
                    {
                        loading ?
                            <PacmanLoader
                                color="#6430d1"
                                loading={loading}
                                cssOverride={override}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                            <div className="display-container">
                                <HomeActionMenu/>
                                {/*<div className="actions-menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <button type="button" className="btn btn-dark" onClick={handleAddMap} disabled={isCardInCreation}>Add Map</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                                <div className="scroll-wrapper">
                                    <div className="container">
                                        <div id="mapCards" className="row {/*row-cols-1 row-cols-md-3*/}">
                                            {Array.from(mapCards.values()).map((card) => (
                                                <MapCard owner={currentUser.userId} id={card.id} name={card.name}
                                                         description={card.description} key={card.name} imgSrc={card.imgSrc}
                                                         people={card.people} relationships={card.relationships}/>
                                            ))}
                                            {isCardInCreation &&
                                                <MapCard owner={currentUser.userId} name="" description=""
                                                         imgSrc={newImgSrc} people={[] as string[]}
                                                         relationships={new Set<string>()}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </>
            }
        </>
    )
}
export default Home;
