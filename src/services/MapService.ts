import env from "react-dotenv";
import {IMapCard} from "../interfaces";

class MapService {
    public async getMapCards () {//http://localhost:7070/api/interrelmap/maps
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps`);
    }

    public async getOwnedMapCards (owner: string) {//http://localhost:7070/api/interrelmap/maps/owned
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps/owned`, {
            method: "POST",
            body: JSON.stringify({owner: owner}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    public async getMapCardById (id: string) {//http://localhost:7070/api/interrelmap/maps/id?id=2voZ6EzntVA18iPVStId
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps/id?id=${id}`);
    }

    public async deleteMapCard (id: string) {//http://localhost:7070/api/interrelmap/maps/ktYLFpFkKU8lAcq9Tlnp
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps/${id}`,{
            method: "DELETE",
        });
    }

    public async getMapCardByName (name: string) {//http://localhost:7070/api/interrelmap/maps/name?name=My third direct map
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps/name?name=${name}`);
    }

    public async addMapCard (mapCard: IMapCard) {//http://localhost:7070/api/interrelmap/maps
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps`, {
            method: "POST",
            body: JSON.stringify(mapCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    public async updateMapCard (mapCard: IMapCard) {//http://localhost:7070/api/interrelmap/maps
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/maps`,{
            method: "PUT",
            body: JSON.stringify(mapCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

}

const MAP_SERVICE = new MapService();
export default MAP_SERVICE;