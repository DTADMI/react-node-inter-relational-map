import env from "react-dotenv";
import {IRelationCard} from "../interfaces";

class RelationService {
    public async getRelationCards () {//http://localhost:7070/api/interrelmap/relationships
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/relationships`);
    }

    public async getRelationCardById (id: string) {//http://localhost:7070/api/interrelmap/relationships/id?id=2voZ6EzntVA18iPVStId
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/relationships/id?id=${id}`);
    }

    public async deleteRelationCard (id: string) {//http://localhost:7070/api/interrelmap/relationships/ktYLFpFkKU8lAcq9Tlnp
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/relationships/${id}`,{
            method: "DELETE",
        });
    }

    public async addRelationCard (relationCard: IRelationCard) {//http://localhost:7070/api/interrelmap/relationships
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/relationships`, {
            method: "POST",
            body: JSON.stringify(relationCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    public async updateRelationCard (relationCard: IRelationCard) {//http://localhost:7070/api/interrelmap/relationships
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/relationships`,{
            method: "PUT",
            body: JSON.stringify(relationCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

}

const RELATION_SERVICE = new RelationService();
export default RELATION_SERVICE;