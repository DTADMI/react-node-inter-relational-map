import env from "react-dotenv";
import {IRelationCard} from "../interfaces";
import axios from "axios";

class RelationService {
    public async getRelationCards () {//http://localhost:7070/api/interrelmap/relationships
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/relationships`);
    }

    public async getRelationCardById (id: string) {//http://localhost:7070/api/interrelmap/relationships/id?id=2voZ6EzntVA18iPVStId
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/relationships/id?id=${id}`);
    }

    public async getRelationshipsInMap (mapId: string) {//http://localhost:7070/api/interrelmap/relationships/mapId
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/relationships/mapId`, {mapId});
    }

    public async deleteRelationCard (id: string) {//http://localhost:7070/api/interrelmap/relationships/ktYLFpFkKU8lAcq9Tlnp
        return await axios.delete(`${env.REACT_APP_API_URL}api/interrelmap/relationships/${id}`);
    }

    public async addRelationCard (relationCard: IRelationCard) {//http://localhost:7070/api/interrelmap/relationships
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/relationships`, relationCard);
    }

    public async updateRelationCard (relationCard: IRelationCard) {//http://localhost:7070/api/interrelmap/relationships
        return await axios.put(`${env.REACT_APP_API_URL}api/interrelmap/relationships`,relationCard);
    }

}

const RELATION_SERVICE = new RelationService();
export default RELATION_SERVICE;