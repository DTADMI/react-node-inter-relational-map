import env from "react-dotenv";
import {IStoryCard} from "../interfaces";
import axios from "axios";

class StoryService {
    public async getStoryCards () {//http://localhost:7070/api/interrelmap/stories
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/stories`);
    }

    public async getStoryCardById (id: string) {//http://localhost:7070/api/interrelmap/stories/id?id=pgkXuhR1FqKVzkskM9vi
        return await axios.get(`${env.REACT_APP_API_URL}api/interrelmap/stories/id?id=${id}`);
    }

    public async deleteStoryCard (id: string) {//http://localhost:7070/api/interrelmap/stories/ktYLFpFkKU8lAcq9Tlnp
        return await axios.delete(`${env.REACT_APP_API_URL}api/interrelmap/stories/${id}`);
    }

    public async addStoryCard (storyCard: IStoryCard) {//http://localhost:7070/api/interrelmap/stories
        return await axios.post(`${env.REACT_APP_API_URL}api/interrelmap/stories`, storyCard);
    }

    public async updateStoryCard (storyCard: IStoryCard) {//http://localhost:7070/api/interrelmap/stories
        return await axios.put(`${env.REACT_APP_API_URL}api/interrelmap/stories`, storyCard);
    }

}

const STORY_SERVICE = new StoryService();
export default STORY_SERVICE;