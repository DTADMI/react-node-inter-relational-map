import React from 'react'
import {IMapCard} from "../interfaces";

export interface IMapCardContextProps {
    isCardInCreation: boolean,
    setCardInCreation: (cardInCreation: boolean) => void,
    isPersonInCreation: boolean,
    setPersonInCreation: (cardInCreation: boolean) => void,
    mapCards: Map<string, IMapCard>,
    setMapCards: (mapCards: Map<string, IMapCard>) => void,
    currentMap:IMapCard,
    setCurrentMap: (currentMap: IMapCard) => void
}

const defaultState: IMapCardContextProps = {
    isCardInCreation: false,
    setCardInCreation: () => {},
    isPersonInCreation: false,
    setPersonInCreation: () => {},
    mapCards: new Map<string, IMapCard>,
    setMapCards: () => {},
    currentMap: {} as IMapCard,
    setCurrentMap: () => {}
};

export default React.createContext(defaultState);
