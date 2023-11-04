import React from 'react'
import {IMapCardUnserialized} from "../interfaces";

export interface IMapCardContextProps {
    isCardInCreation: boolean,
    setCardInCreation: (cardInCreation: boolean) => void,
    isPersonInCreation: boolean,
    setPersonInCreation: (cardInCreation: boolean) => void,
    mapCards: Map<string, IMapCardUnserialized>,
    setMapCards: (mapCards: Map<string, IMapCardUnserialized>) => void,
    currentMap:IMapCardUnserialized,
    setCurrentMap: (currentMap: IMapCardUnserialized) => void
}

const defaultState: IMapCardContextProps = {
    isCardInCreation: false,
    setCardInCreation: () => {},
    isPersonInCreation: false,
    setPersonInCreation: () => {},
    mapCards: new Map<string, IMapCardUnserialized>(),
    setMapCards: () => {},
    currentMap: {} as IMapCardUnserialized,
    setCurrentMap: () => {}
};

export default React.createContext(defaultState);
