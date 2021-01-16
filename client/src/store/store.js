import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [],
    players: [],
    wordSelected: [],
    score: [0, 0],
    round: 2
  },
  mutations: {
    ADD_ROUND(state) {
      state.round += 1
    },
    ADD_GAME(state, game) {
      state.games.push(game)
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    NEXT_WORD(state, { word }) {
      state.wordSelected.push(word);
      if (state.round % 2 == 0) {
        Vue.set(state.score, 0, state.score[0] + 1)
      }
      else {
        Vue.set(state.score, 0, state.score[1] + 1)
      }
    }
  },
  actions: {
    createPlayer({ commit }, { player }) {
      return EventService.postPlayer(player)
        .then(() => {
          commit("ADD_PLAYER", player);
        })
        .catch(() => {
          console.log("eror");
        });
    },
    createGame({ commit }, game) {
      return EventService.postGame(game)
        .then(() => {
          commit("ADD_GAME", game);
        })
        .catch(() => {
          console.log("error");
        });
    },
    fetchPlayers({ commit }, gameCode) {

      EventService.getPlayers(gameCode)
        .then(response => {
          commit("SET_PLAYERS", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  getters: {
    listWord: state => {
      var list = [];
      state.players.map(item => {
        item.list.map(word => {
          list.push(word);
        });
      });
      return list;
    },
    listFilter: (state, getters) => {
      return getters.listWord.filter(function (item) {
        return !state.wordSelected.includes(item);
      });
    },
    word: (state, getters) => {
      return getters.listFilter[getters.index];
    },
    index: (state, getters) => {
      return Math.floor(Math.random() * getters.listFilter.length);
    },
    blueTeam: state => {
      var list = [];
      state.players.map(item => {
        if (item.team == 1) {
          list.push(item.name);
        }
      });
      return list;
    },
    redTeam: state => {
      var list = [];
      state.players.map(item => {
        if (item.team == 2) {
          list.push(item.name);
        }
      });
      return list;
    },
    scoreTeam: state => {
      if (state.round % 2 == 0) {
        return state.score[0]
      }
      else {
        return state.score[1]
      }
    }
  }
});
