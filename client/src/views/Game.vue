<template>
  <v-container class="fluid d-flex mt-5">
    <v-row justify="center">
      <v-col xs="8" sm="10" md="10" col="10" align="center">
        <v-row justify="center">
          <v-col xs="10" sm="5">
            <p class="subtitle-1">
              Team {{ currentTeam }} / Score {{ score }}
            </p>
            <p class="pb-10 headline">
              Joueur
              <span class="font-weight-bold" :class="currentColorClass">{{
                currentPlayer
              }}</span>
            </p>
          </v-col>
          <v-col xs="10" sm="5" md="10">
            <v-chip
              v-if="!finish"
              color="default"
              outlined
              class="headline mb-12 label py-8"
            >
              <!--     Start Timer -->
              <v-icon v-if="!timer" x-large class="mr-5" @click="startTimer">
                mdi-play-circle-outline
              </v-icon>
              <!--     Pause Timer -->
              <v-icon v-if="timer" x-large class="mr-5" @click="stopTimer">
                mdi-pause-circle
              </v-icon>
              <!--     Restart Timer -->
              <v-icon
                v-if="resetButton"
                x-large
                class="mr-5"
                @click="resetTimer"
              >
                mdi-replay
              </v-icon>

              <span id="minutes">{{ minutes }}</span>
              <span id="middle">:</span>
              <span id="seconds">{{ seconds }}</span>
            </v-chip></v-col
          >
        </v-row>
        <v-col v-if="gameFinished">
          <p class="display-2">Partie terminée</p>
          <v-btn
            color="indigo darken-2"
            class="white--text mr-5"
            @click="goDashBoard"
          >
            Voir le score
          </v-btn>
        </v-col>
        <v-col v-if="!finish && !gameFinished" v align="center">
          <v-row justify="center" class="mb-12">
            <p v-if="showWord" class="display-3 mb-8">
              {{ currentWord }}
            </p>
            <v-btn
              v-if="!showWord"
              small
              color="indigo darken-2"
              class="white--text"
              @click="showWordFunction"
            >
              Montrer le mot
            </v-btn>
          </v-row>

          <v-row justify="center">
            <v-btn
              small
              color="#E71D36"
              class="white--text mr-5"
              @click="skipWord"
            >
              Raté
            </v-btn>
            <v-btn small color="green" class="white--text" @click="nextWord">
              Trouvé
            </v-btn></v-row
          >
        </v-col>

        <v-btn
          v-if="finish"
          small
          color="indigo darken-2"
          class="mb-5 white--text"
          @click="switchTeam"
        >
          Switch Team
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
var audio = new Audio(require("../assets/sonnerie.mp3"));
export default {
  data() {
    return {
      timer: null,
      timeToGuess: this.$store.getters.timeGame,
      resetButton: false,
      finish: false,
      showWord: false,
      gameFinished: false,
      color: ["Bleu", "Rouge"],
      playerIndex: [0, 0],
    };
  },
  computed: {
    round() {
      return this.$store.state.round;
    },
    numberPlayerTeam() {
      if (this.round % 2 == 0) {
        return this.$store.getters.blueTeam.length;
      } else {
        return this.$store.getters.redTeam.length;
      }
    },
    currentWord() {
      return this.$store.getters.word;
    },
    currentTeam() {
      if (this.round % 2 == 0) {
        return this.color[0];
      } else {
        return this.color[1];
      }
    },
    currentColorClass() {
      if (this.round % 2 == 0) {
        return "blue--text";
      } else {
        return "red--text";
      }
    },
    currentPlayer() {
      if (this.round % 2 == 0) {
        return this.$store.getters.blueTeam[this.playerIndex[0]];
      } else {
        return this.$store.getters.redTeam[this.playerIndex[1]];
      }
    },
    score() {
      return this.$store.getters.scoreTeam;
    },

    ...mapState(["players"]),

    minutes(){
      return this.$store.getters.minutes
    },
    seconds() {
      return this.$store.getters.seconds
    }
    
  },
  watch: {},
  created() {
    this.$store.dispatch("fetchGame", this.$route.params.idGame);
    this.$store.dispatch("fetchPlayers", this.$route.params.idGame);
    //this.timeToGuess = this.$store.getters.timeGame
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      this.$store.commit("RESET_TIMER");
      //this.timeToGuess = this.$store.state.game.timeToGuess;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    countdown() {
      this.$store.commit("COUNT_DOWN");
      if (this.seconds > 0) {
        this.timeToGuess--;
      } else {
        this.stopTimer();
        this.resetButton = false;
        this.finish = true;
        this.showWord = false;
        audio.play();
      }
    },
    switchTeam() {
      audio.pause();
      if (this.round % 2 == 0) {
        this.playerIndex[0] += 1;
        if (this.playerIndex[0] == this.numberPlayerTeam) {
          this.playerIndex[0] = 0;
        }
      } else {
        this.playerIndex[1] += 1;
        if (this.playerIndex[1] == this.numberPlayerTeam) {
          this.playerIndex[1] = 0;
        }
      }
      this.$store.commit("ADD_ROUND");
      this.finish = false;
      this.resetTimer();
    },
    nextWord() {
      this.$store.commit("NEXT_WORD", {
        word: this.currentWord,
      });
      // When it finishes
      if (this.currentWord == null) {
        this.gameFinished = true;
      }
    },
    skipWord() {
      if (!this.resetButton) {
        this.startTimer();
      }

      this.$store.commit("SKIP_WORD", { word: this.currentWord });
    },
    showWordFunction() {
      this.showWord = true;
    },
    goDashBoard() {
      this.$router.push({
        name: "DashBoard",
        params: { idGame: this.$route.params.idGame },
      });
    },
  },
};
</script>

<style scoped>
</style>
