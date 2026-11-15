import env from "react-dotenv";
import {IMapCard} from "../interfaces";
import axios from "axios";

class MapService {
    public async getMapCards () {//http://localhost:7070/api/interrelmap/maps
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/maps`);
    }

    public async getOwnedMapCards (owner: string) {//http://localhost:7070/api/interrelmap/maps/owned
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/maps/owned`, {owner});
    }

    public async getMapCardById (id: string) {//http://localhost:7070/api/interrelmap/maps/id?id=2voZ6EzntVA18iPVStId
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/maps/id?id=${id}`);
    }

    public async deleteMapCard (id: string) {//http://localhost:7070/api/interrelmap/maps/ktYLFpFkKU8lAcq9Tlnp
        return await axios.delete(`${env.REACT_APP_API_URL}api/interrelmap/maps/${id}`);
    }

    public async getMapCardByName (name: string) {//http://localhost:7070/api/interrelmap/maps/name?name=My third direct map
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/maps/name?name=${name}`);
    }

    public async addMapCard (mapCard: IMapCard) {//http://localhost:7070/api/interrelmap/maps
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/maps`, mapCard);
    }

    public async updateMapCard (mapCard: IMapCard) {//http://localhost:7070/api/interrelmap/maps
        return await axios.put(`${env.REACT_APP_API_URL}api/interrelmap/maps`,mapCard);
    }

}

const MAP_SERVICE = new MapService();
export default MAP_SERVICE;