import axios from "axios";
//import { createLogger } from "vuex";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getPlayers(gameId) {
    return apiClient.get("/games/" + gameId+ "/players");
  },
  /*getGames() {
   return apiClient.get("/game");
 },*/
  // getEvent(id) {
  //   return apiClient.get("/events/" + id);
  // },
  postPlayer(player) {

    return apiClient.post("/players", player);
  },
  postGame(game) {
    return apiClient.post("/games", game);
  }
};
