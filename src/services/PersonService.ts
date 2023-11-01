import env from "react-dotenv";
import {IPersonCard} from "../interfaces";

class PersonService {
    public async getPersonCards () {//http://localhost:7070/api/interrelmap/people
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/people`);
    }

    public async getPersonCardById (id: string) {//http://localhost:7070/api/interrelmap/people/id?id=2voZ6EzntVA18iPVStId
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/people/id?id=${id}`);
    }

    public async deletePersonCard (id: string) {//http://localhost:7070/api/interrelmap/people/ktYLFpFkKU8lAcq9Tlnp
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/people/${id}`,{
            method: "DELETE",
        });
    }

    public async addPersonCard (personCard: IPersonCard) {//http://localhost:7070/api/interrelmap/people
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/people`, {
            method: "POST",
            body: JSON.stringify(personCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    public async updatePersonCard (personCard: IPersonCard) {//http://localhost:7070/api/interrelmap/people
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/people`,{
            method: "PUT",
            body: JSON.stringify(personCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

}

export default new PersonService();