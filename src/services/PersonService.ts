import env from "react-dotenv";
import {IPersonCard} from "../interfaces";
import axios from "axios";

class PersonService {
    public async getPersonCards () {//http://localhost:7070/api/interrelmap/people
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/people`);
    }

    public async getPersonCardById (id: string) {//http://localhost:7070/api/interrelmap/people/id?id=2voZ6EzntVA18iPVStId
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/people/id?id=${id}`);
    }

    public async deletePersonCard (id: string) {//http://localhost:7070/api/interrelmap/people/ktYLFpFkKU8lAcq9Tlnp
        return await axios.delete(`${env.REACT_APP_API_URL}api/interrelmap/people/${id}`);
    }

    public async addPersonCard (personCard: IPersonCard) {//http://localhost:7070/api/interrelmap/people
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/people`,personCard);
    }

    public async updatePersonCard (personCard: IPersonCard) {//http://localhost:7070/api/interrelmap/people
        return await axios.put(`${env.REACT_APP_API_URL}api/interrelmap/people`,personCard);
    }

}

const PERSON_SERVICE = new PersonService();
export default PERSON_SERVICE;