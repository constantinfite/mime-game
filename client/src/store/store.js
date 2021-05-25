import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {},
    players: [],
    listWordDone: [],
    round: 2,
    soundButton: new Audio(require("../assets/button3.mp3")),
  },
  mutations: {
    ADD_ROUND(state) {
      state.round += 1
      var i = state.listWordDone.length
      while (i--) {

        if (!state.listWordDone[i].found) {
          !state.listWordDone.splice(i, 1);
        }
      }
    },
    SET_GAME(state, game) {
      //state.game.scoreBleu = game.scoreBleu
      //state.game.scoreRouge = game.scoreRouge
      Vue.set(state.game, 'timeLeft', game.timeToGuess)
      Vue.set(state.game, 'timeToGuess', game.timeToGuess)
      Vue.set(state.game, 'mode', game.mode)
      Vue.set(state.game, 'id', game.id)
      Vue.set(state.game, 'scoreBleu', game.scoreBleu)
      Vue.set(state.game, 'scoreRouge', game.scoreRouge)
      Vue.set(state.game, 'alcoolMode', game.alcool)

    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    NEXT_WORD(state, { word, id }) {
      state.listWordDone.push({ id: id, word: word, found: true });

      if (state.round % 2 == 0) {
        Vue.set(state.game, 'scoreBleu', state.game.scoreBleu + 1)
      }
      else {
        Vue.set(state.game, 'scoreRouge', state.game.scoreRouge + 1)
      }
    },
    RESET_LIST(state) {
      state.listWordDone = []
    },
    SKIP_WORD(state, { word, id }) {
      state.listWordDone.push({ id: id, word: word, found: false });
    },
    COUNT_DOWN(state) {
      state.game.timeLeft--
    },
    RESET_TIMER(state) {
      Vue.set(state.game, 'timeLeft', state.game.timeToGuess)
    },

    CHANGE_STATE_WORD(state, { id }) {
      var index = state.listWordDone.findIndex(x => x.id === id);
      if (state.round % 2 == 0) {
        if (state.listWordDone[index].found) {
          Vue.set(state.game, 'scoreBleu', state.game.scoreBleu - 1)
        }
        else {
          Vue.set(state.game, 'scoreBleu', state.game.scoreBleu + 1)
        }

      }
      else {
        if (state.listWordDone[index].found) {
          Vue.set(state.game, 'scoreRouge', state.game.scoreRouge - 1)
        }
        else {
          Vue.set(state.game, 'scoreRouge', state.game.scoreRouge + 1)
        }
      }
      state.listWordDone[index].found = !state.listWordDone[index].found

    }

  },
  actions: {
    createPlayer({ commit }, { player }) {
      EventService.postPlayer(player)
        .then(() => {
          commit("ADD_PLAYER", player);
        })
        .catch(() => {
          console.log("eror");
        });


    },
    createGame({ commit }, game) {
      
      EventService.postGame(game)
        .then(() => {
          commit("SET_GAME", game);
        })
        .catch((err) => {
          console.log("error");
          console.log(err)
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
    },
    fetchGame({ commit }, gameCode) {

      EventService.getGame(gameCode)
        .then(response => {
          commit("SET_GAME", response.data);
        })
        .catch(error => {
          console.log("There was an error in fetching game:", error.response);
        });
    },
  },

  getters: {
    listWord: state => {
      var list = [];
      var count = 1
      state.players.map(item => {
        item.list.map(word => {
          list.push({ id: count, word: word });
          count++
        });
      });
      return list;
    },
    listFilter: (state, getters) => {
      var listFound = []
      state.listWordDone.map(item => {

        listFound.push(item.word)

      })
      var list = getters.listWord.filter(
        item => !listFound.includes(item.word))
      return list
    },
    word: (state, getters) => {
      //envoie un mot null quand tous les mots sont fait
      if (getters.listFilter.length == 0) {
        return { id: 0, word: null }
      }
      else {
        return getters.listFilter[getters.index];
      }


    },
    index: (state, getters) => {
      return Math.floor(Math.random() * getters.listFilter.length);
    },
    numberOfNotFound: (state) => {
      return state.listWordDone.filter((obj) => obj.found === false).length;
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
      return [state.game.scoreBleu, state.game.scoreRouge]
    },
    timeLeft: state => {
      return state.game.timeLeft
    },
    minutes: (state, getters) => {
      const minutes = Math.floor(getters.timeLeft / 60);
      return (minutes < 10 ? "0" : "") + minutes;
    },
    seconds: (state, getters) => {
      const seconds = getters.timeLeft - getters.minutes * 60;
      return (seconds < 10 ? "0" : "") + seconds;
    },
    gameMode: state => {
      return state.game.mode
    },
    alcoolMode: state => {
      return state.game.alcoolMode
    },
    results: state => {
      var array = [];

      array.push({
        nom: "Ninja",
        winner: (state.game.scoreBleu > state.game.scoreRouge),
        score: state.game.scoreBleu,
        color: "blue",
      });
      array.push({
        nom: "Pirate",
        winner: (state.game.scoreBleu < state.game.scoreRouge),
        score: state.game.scoreRouge,
        color: "red",
      });
      return array;
    }
  }
});
