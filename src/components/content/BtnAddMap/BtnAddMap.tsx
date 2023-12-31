import React, {useContext} from "react";
import mapCardContext from "../../../contexts/MapCardContext";

export const BtnAddMap = () => {

    const {
        isCardInCreation,
        setCardInCreation,
    } = useContext(mapCardContext);

    const handleAddMap = (e: React.FormEvent) => {
        e.preventDefault();
        setCardInCreation(true);
    }

    return (
        <button type="button" className="btn btn-dark btn-outline-primary right-align-absolute" style={{ position: "absolute", top: "0.5rem", right: "5rem" }} onClick={handleAddMap} disabled={isCardInCreation}>Add Map</button>
    );
};
