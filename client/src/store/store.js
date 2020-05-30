import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    game: {}
  },
  mutations: {
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    }
  },
  actions: {
    createPlayer({ commit }, player) {
      return EventService.postPlayer(player)
        .then(() => {
          commit("ADD_PLAYER", player);
        })
        .catch(() => {
          console.log("eror");
        });
    },
    fetchPlayers({ commit }) {
      EventService.getPlayers()
        .then(response => {
          commit("SET_PLAYERS", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  modules: {}
});
