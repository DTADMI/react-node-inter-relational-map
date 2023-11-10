import React, {useContext, useEffect, useState} from 'react';
import authContext from "../../../contexts/AuthContext";
import mapCardContext from "../../../contexts/MapCardContext";
import "./Home.css"
import {MapCard} from "../MapCard/MapCard";
import {IMapCard} from "../../../interfaces";
import MapService from "../../../services/MapService";
import {getRandomIntInclusive} from "../../../common/functions";
import {HomeActionMenu} from "../../navigation/HomeActionMenu/HomeActionMenu";
import {PacmanLoader} from "react-spinners";
import {signal} from "@preact/signals-react";
import {Pagination} from "../../navigation/Pagination/Pagination";
import {createBrowserHistory} from "history";
import qs from "qs";

const generateNewImgSrc = () => {
    let randomInt = getRandomIntInclusive(1, 10);
    return "/images/picsum"+randomInt+"_582-180x100.jpg";
}

export interface IHomeProps {}
const Home: React.FunctionComponent<IHomeProps> = (props: React.PropsWithChildren<IHomeProps>) => {
    const {
        currentUser
    } = useContext(authContext);
    const {
        isCardInCreation,
        mapCards,
        setMapCards,
        setCurrentMap,
        loadingCssOverride
    } = useContext(mapCardContext);
    const newImgSrc = signal(generateNewImgSrc());

    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [pageOffset, setPageOffset] = useState(1);
    const mapsPerPage = 3;
    const [displayedMaps, setDisplayedMaps] = useState(new Map<string, IMapCard>());
    const history = createBrowserHistory();

    const compareMapsEntryByDate = (mapEntry1: [string, IMapCard], mapEntry2: [string, IMapCard]): number => {
        const map1LastModifTime = mapEntry1[1].lastModificationDate ? new Date(mapEntry1[1].lastModificationDate).getTime() : new Date().getTime();
        const map2LastModifTime = mapEntry2[1].lastModificationDate ? new Date(mapEntry2[1].lastModificationDate).getTime() : new Date().getTime();
        if(map1LastModifTime < map2LastModifTime){
            return 1;
        } else if(map1LastModifTime > map2LastModifTime){
            return -1;
        } else {
            return 0;
        }
    }

    const getMapCards = (userId: string) => {
        return MapService.getOwnedMapCards(userId)
            .then((response)=>{
                return response.json();
            })
            .then((data: IMapCard[])=>{
                let newMapOfCards = new Map<string, IMapCard>();
                data.forEach((card)=>{
                    if(!card.imgSrc) {
                        card.imgSrc = generateNewImgSrc();
                    }
                    if(!card.lastModificationDate){
                        card.lastModificationDate = new Date().toUTCString();
                    }
                    newMapOfCards.set(card.name, card);
                });
                return new Map(Array.from(newMapOfCards).sort(compareMapsEntryByDate));
            })
            .catch((error) => {
                console.error(`Error while getting owned maps : ${JSON.stringify(error)}`);
                return new Map<string, IMapCard>();
        });
    }

    useEffect(() => {
        const userId = currentUser.userId;
        if(userId) {
            setLoading(true);
            getMapCards(userId).then((maps) => {
                console.table(maps);
                setMapCards(maps);
                const filterParams = history.location.search.substring(1);
                const filtersFromParams = qs.parse(filterParams);
                if (filtersFromParams.page) {
                    const page = parseInt(filtersFromParams.page as string);
                    setPageOffset(page);
                }
                if(maps.size===0){
                    setLoading(false);
                }
            });
        }
        setCurrentMap({} as IMapCard);
    }, [currentUser, isCardInCreation]);

    useEffect(() => {
        const numberOfCards = mapCards.size;
        setPageCount(Math.ceil(numberOfCards / mapsPerPage));
        if(numberOfCards && pageOffset) {
            const filterParams = history.location.search.substring(1);
            const filtersFromParams = qs.parse(filterParams);
            let page = pageOffset;
            if (!filtersFromParams.page) {
                history.push(`?page=${pageOffset}`);
            } else {
                page = parseInt(filtersFromParams.page as string);
                page = !isNaN(page) ? page : 0;
            }
            const startIndex = (page - 1) * mapsPerPage;
            const endIndex = (page) * mapsPerPage;
            let slicedMaps = new Map<string, IMapCard>();
            Array.from(mapCards.values()).slice(startIndex, endIndex).forEach((map: IMapCard) => {
                slicedMaps.set(map.name, map);
            })
            setDisplayedMaps(slicedMaps);
            setLoading(false);
        }
   }, [pageOffset, mapCards]);

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
                                cssOverride={loadingCssOverride}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                            <div className="display-container">
                                <HomeActionMenu/>
                                <div className="scroll-wrapper">
                                    {mapCards.size > 0 &&
                                        <div className="container">
                                            <div id="mapCards" className="row {/*row-cols-1 row-cols-md-3*/}">
                                                {Array.from(displayedMaps.values()).map((card) => (
                                                    <MapCard owner={currentUser.userId} id={card.id} name={card.name}
                                                             description={card.description} key={card.name} imgSrc={card.imgSrc}
                                                             people={card.people}/>
                                                ))}
                                                {isCardInCreation &&
                                                    <MapCard owner={currentUser.userId} name="" description=""
                                                             imgSrc={newImgSrc.value} people={[] as string[]}/>
                                                }
                                            </div>
                                            {displayedMaps.size > 0 &&
                                                <Pagination pageCount={pageCount} pageOffset={pageOffset} setPageOffset={setPageOffset} history={history}/>
                                            }
                                        </div>
                                    }
                                    {mapCards.size === 0 &&
                                        <div style={{ display: "flex", textAlign:"center", backgroundColor: "gray", color: "darkgray" }}>
                                            <p>You currently have no map...</p>
                                            <p>Create one to start working on it.</p>
                                        </div>
                                    }
                                </div>
                            </div>
                    }
                </>
            }
        </>
    )
}
export default Home;
