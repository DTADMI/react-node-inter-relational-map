import env from "react-dotenv";
import {IStoryCard} from "../interfaces";

class StoryService {
    public async getStoryCards () {//http://localhost:7070/api/interrelmap/stories
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/stories`);
    }

    public async getStoryCardById (id: string) {//http://localhost:7070/api/interrelmap/stories/id?id=pgkXuhR1FqKVzkskM9vi
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/stories/id?id=${id}`);
    }

    public async deleteStoryCard (id: string) {//http://localhost:7070/api/interrelmap/stories/ktYLFpFkKU8lAcq9Tlnp
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/stories/${id}`,{
            method: "DELETE",
        });
    }

    public async addStoryCard (StoryCard: IStoryCard) {//http://localhost:7070/api/interrelmap/stories
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/stories`, {
            method: "POST",
            body: JSON.stringify(StoryCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    public async updateStoryCard (storyCard: IStoryCard) {//http://localhost:7070/api/interrelmap/stories
        return await fetch(`${env.REACT_APP_API_URL}api/interrelmap/stories`,{
            method: "PUT",
            body: JSON.stringify(storyCard),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

}

export default new StoryService();