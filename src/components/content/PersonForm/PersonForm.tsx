import React, {useContext, useState} from 'react'
import {Card, Container, Form} from "react-bootstrap";
import mapCardContext from "../../../contexts/MapCardContext";
import PersonService from "../../../services/PersonService";
import {IMapCardSerialized, IPersonCard} from "../../../interfaces";
import MapService from "../../../services/MapService";
import {serializeMapCardObject, unserializeMapCardObject} from "../../../common/functions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export interface IPropsPersonForm {
    /*show: boolean,
    handleClose: () => void*/
};
const PersonForm: React.FunctionComponent<IPropsPersonForm> = (props: React.PropsWithChildren<IPropsPersonForm>) => {

    const {
        currentMap,
        setCurrentMap,
        isPersonInCreation,
        setPersonInCreation
    } = useContext(mapCardContext);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [namesInput, setNamesInput] = useState("");
    const [familyNamesInput, setFamilyNamesInput] = useState("");
    const [titlesInput, setTitlesInput] = useState("");
    const [names, setNames] = useState([] as string[]);
    const [familyNames, setFamilyNames] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(names.length){
            try {
                setError('');
                setLoading(true);

                PersonService.addPersonCard({names, familyNames, titles} as IPersonCard)
                    .then((response) => {
                        return response.json();
                    })
                    .then((personData: IPersonCard)=>{
                        const mapCard = serializeMapCardObject(currentMap);
                        if (personData.id) {
                            mapCard.people.push(personData.id);
                        }

                        MapService.updateMapCard(mapCard)
                            .then((response) => {
                                return response.json();
                            })
                            .then((mapData: IMapCardSerialized) => {
                                setCurrentMap(unserializeMapCardObject(mapData));
                                setPersonInCreation(false);
                            }).catch((error) => {
                                console.error(`Error while updating map : ${JSON.stringify(error)}`);
                            });
                    }).catch((error) => {
                        console.error(`Error while creating person : ${JSON.stringify(error)}`);
                    });
            } catch (err) {
                setError("Something went wrong while creating this person. Please try again later");
            }
        } else {
            setError("Names cannot be empty");
        }
        setLoading(false);
    };

    const handleCancelPersonCardCreation = (e: React.FormEvent) => {
        e.preventDefault();
        setPersonInCreation(false);
    }

    const handleAddName = async (e: React.FormEvent) => {
        e.preventDefault();

        let newNames = [...names];
        newNames.push(namesInput);
        setNames(newNames);
        setNamesInput("");

    };

    const handleRemoveName = async (e: React.FormEvent) => {
        e.preventDefault();

        let newNames = [...names];
        newNames.pop();
        setNames(newNames);

    };

    const handleAddFamilyName = async (e: React.FormEvent) => {
        e.preventDefault();

        let newFamilyNames = [...familyNames];
        newFamilyNames.push(familyNamesInput);
        setFamilyNames(newFamilyNames);
        setFamilyNamesInput("");

    };

    const handleRemoveFamilyName = async (e: React.FormEvent) => {
        e.preventDefault();

        let newFamilyNames = [...familyNames];
        newFamilyNames.pop();
        setFamilyNames(newFamilyNames);

    };

    const handleAddTitle = async (e: React.FormEvent) => {
        e.preventDefault();

        let newTitles = [...titles];
        newTitles.push(titlesInput);
        setTitles(newTitles);
        setTitlesInput("");

    };

    const handleRemoveTitle = async (e: React.FormEvent) => {
        e.preventDefault();

        let newTitles = [...titles];
        newTitles.pop();
        setTitles(newTitles);
    };

    return (
        <Modal
            show={isPersonInCreation}
            onHide={()=>setPersonInCreation(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a new person</Modal.Title>
                {error && <div className="alert alert-danger">{error}</div>}
            </Modal.Header>
            <Modal.Body>
                {/*<Container
                    className="d-flex align-items-center justify-content-center"
                    style={{minHeight: "50vh"}}>
                    <div className="w-100" style={{maxWidth: "400px"}}>
                        <Card>
                            <Card.Body>
                                <h5 className="text-center mb-4">Add a new person</h5>
                                {error && <div className="alert alert-danger">{error}</div>}*/}
                                <Form>{/*onSubmit={handleSubmit}>*/}
                                    <div className="input-group" style={{marginBottom: "1rem"}}>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-danger" style={{height: "-webkit-fill-available"}} onClick={handleRemoveName}>
                                        <span className="glyphicon glyphicon-minus">-</span>
                                      </button>
                                  </span>
                                        <input type="text" name="namesInput" id="namesInput" className="form-control-plaintext"
                                               value={namesInput} placeholder="Names"
                                               onChange={(e) => setNamesInput(e.target.value)} style={{
                                            width: "55%",
                                            border: "1px solid royalblue",
                                            borderRadius: "1rem",
                                            marginLeft: "1rem",
                                            marginRight: "1rem",
                                            textAlign: "center"
                                        }}/>
                                        <span className="input-group-btn">
                                      <button type="button" className="btn btn-success" style={{height: "-webkit-fill-available"}} onClick={handleAddName}>
                                          <span className="glyphicon glyphicon-plus">+</span>
                                      </button>
                                  </span>
                                        {!!names.length && <span>{names.reduce((prev, curr) => {
                                            return !prev ? curr : prev + "; " + curr
                                        })}</span>}
                                    </div>
                                    <div className="input-group" style={{marginBottom: "1rem"}}>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-danger" style={{height: "-webkit-fill-available"}}
                                              onClick={handleRemoveFamilyName}>
                                        <span className="glyphicon glyphicon-minus">-</span>
                                      </button>
                                  </span>
                                        <input type="text" name="familyNamesInput" id="familyNamesInput"
                                               className="form-control-plaintext" value={familyNamesInput}
                                               placeholder="Family Names" onChange={(e) => setFamilyNamesInput(e.target.value)}
                                               style={{
                                                   width: "55%",
                                                   border: "1px solid royalblue",
                                                   borderRadius: "1rem",
                                                   marginLeft: "1rem",
                                                   marginRight: "1rem",
                                                   textAlign: "center"
                                               }}/>
                                        <span className="input-group-btn">
                                      <button type="button" className="btn btn-success" style={{height: "-webkit-fill-available"}} onClick={handleAddFamilyName}>
                                          <span className="glyphicon glyphicon-plus">+</span>
                                      </button>
                                  </span>
                                        {!!familyNames.length && <span>{familyNames.reduce((prev, curr) => {
                                            return !prev ? curr : prev + "; " + curr
                                        })}</span>}
                                    </div>
                                    <div className="input-group" style={{marginBottom: "1rem"}}>
                                  <span className="input-group-btn">
                                      <button type="button" className="btn btn-danger" style={{height: "-webkit-fill-available"}} onClick={handleRemoveTitle}>
                                        <span className="glyphicon glyphicon-minus">-</span>
                                      </button>
                                  </span>
                                        <input type="text" name="titlesInput" id="titlesInput"
                                               className="form-control-plaintext" value={titlesInput} placeholder="Titles"
                                               onChange={(e) => setTitlesInput(e.target.value)} style={{
                                            width: "55%",
                                            border: "1px solid royalblue",
                                            borderRadius: "1rem",
                                            marginLeft: "1rem",
                                            marginRight: "1rem",
                                            textAlign: "center"
                                        }}/>
                                        <span className="input-group-btn">
                                      <button type="button" className="btn btn-success" style={{height: "-webkit-fill-available"}} onClick={handleAddTitle}>
                                          <span className="glyphicon glyphicon-plus">+</span>
                                      </button>
                                  </span>
                                        {!!titles.length && <span>{titles.reduce((prev, curr) => {
                                            return !prev ? curr : prev + "; " + curr
                                        })}</span>}
                                    </div>
                                    {/*<div className="d-grid gap-2">
                                        <button className="btn btn-primary" type="submit" disabled={loading}>Create</button>
                                        <button className="btn btn-secondary" onClick={handleCancelPersonCardCreation}>Cancel
                                        </button>
                                    </div>*/}
                                </Form>
                            {/*</Card.Body>
                        </Card>
                    </div>
                </Container>*/}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelPersonCardCreation}>
                    Cancel
                </Button>
                <Button variant="primary" disabled={loading} onClick={handleSubmit}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonForm;
