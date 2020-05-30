import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
   getPlayers() {
     return apiClient.get("/players");
   },
  // getEvent(id) {
  //   return apiClient.get("/events/" + id);
  // },
  postPlayer(player) {
    return apiClient.post("/players", player);
  }
};
