import React, {CSSProperties} from 'react'
import {IMapCard} from "../interfaces";

export interface IMapCardContextProps {
    isCardInCreation: boolean,
    setCardInCreation: (cardInCreation: boolean) => void,
    isPersonInCreation: boolean,
    setPersonInCreation: (cardInCreation: boolean) => void,
    mapCards: Map<string, IMapCard>,
    setMapCards: (mapCards: Map<string, IMapCard>) => void,
    currentMap:IMapCard,
    setCurrentMap: (currentMap: IMapCard) => void,
    loadingCssOverride: CSSProperties,
    setLoadingCssOverride: (loadingCssOverride: {}) => void
}

const defaultState: IMapCardContextProps = {
    isCardInCreation: false,
    setCardInCreation: () => {},
    isPersonInCreation: false,
    setPersonInCreation: () => {},
    mapCards: new Map<string, IMapCard>(),
    setMapCards: () => {},
    currentMap: {} as IMapCard,
    setCurrentMap: () => {},
    loadingCssOverride: {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        position: "fixed",
        top: "50%",
        bottom: "50%",
        left: "50%",
        right: "50%"
    },
    setLoadingCssOverride: () => {}
};

export default React.createContext(defaultState);
