import axios from "axios";

const apiClient = axios.create({
  //baseURL: `http://localhost:3000`,
  baseURL: "https://data-base-mime.herokuapp.com",
  //baseURL: "https://mime-project.herokuapp.com/api",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getGame(gameCode) {
    
    return apiClient.get("/games/" + gameCode);
  },

  getPlayers(gameId) {

    return apiClient.get("/games/" + gameId + "/players");
  },
  postPlayer(player) {

    return apiClient.post("/players", player);
  },
  postGame(game) {
    return apiClient.post("/games", game);
  },

};
