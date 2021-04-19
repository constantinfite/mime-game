<template>
  <v-container id="bg" class="fluid d-flex mt-5 background">
    <v-row justify="center">
      <v-col xs="8" sm="10" md="10" col="10" align="center">
        <v-row justify="center mt-3">
          <v-col xs="10" sm="10">
            <span>
              {{ score[0] }}
              <v-icon size="50" :class="colorNinja" class="mr-3 ml-2">
                mdi-ninja
              </v-icon>
              <v-icon size="50" :class="colorPirate" class="mr-2">
                mdi-pirate
              </v-icon>
              {{ score[1] }}
            </span>

            <p class="mt-2">
              <span v-if="gameMode == 'timesup'">
                Manche
                <span>
                  <span class="font-weight-bold headline">
                    {{ manche[mancheCounter] }}
                  </span>
                  -
                </span>
              </span>
              Joueur
              <span class="font-weight-bold headline">{{ currentPlayer }}</span>
            </p>
            <v-chip
              v-if="!finish"
              color="default"
              outlined
              class="display-1 mb-12 mt-4 label px py-8"
            >
              <!--     Start Timer -->
              <v-icon
                v-if="!timer && beginning"
                size="30"
                class="mr-3"
                @click="startTimer"
              >
                mdi-play-circle-outline
              </v-icon>
              <!--     Pause Timer -->
              <v-icon v-if="timer" size="30" class="mr-3" @click="stopTimer">
                mdi-pause-circle
              </v-icon>
              <!--     Restart Timer -->
              <v-icon
                v-if="resetButton"
                size="30"
                class="mr-5"
                @click="resetTimer"
              >
                mdi-replay
              </v-icon>

              <span id="minutes">{{ minutes }}</span>
              <span id="middle">:</span>
              <span id="seconds">{{ seconds }}</span>
            </v-chip>
          </v-col>
        </v-row>
        <v-col v-if="gameFinished">
          <p class="display-2">Partie terminée</p>
          <v-btn
            color="indigo darken-2"
            class="white--text mt-5"
            @click="goDashBoard"
          >
            Voir le score
          </v-btn>
        </v-col>
        <v-col v-if="mancheFinished && !gameFinished">
          <p class="display-2">Manche {{ mancheCounter + 1 }} terminée</p>
          <v-btn
            x-large
            color="indigo darken-2"
            class="white--text mt-5"
            @click="switchManche"
          >
            Changer de manche
          </v-btn>
        </v-col>
        <v-col v-if="!finish && !mancheFinished" align="center">
          <v-row justify="center" class="mb-6">
            <p v-if="showWord" class="display-3 mb-8">
              {{ currentWord }}
            </p>
            <v-btn
              v-if="!showWord"
              x-large
              color="cyan darken-1"
              class="pa-8 white--text mb-12"
              @click="showWordFunction"
            >
              Montrer le mot
            </v-btn>
          </v-row>

          <v-row v-if="showWord" justify="center">
            <v-btn
              color="green darken-1 "
              x-large
              class="mr-12 pa-8 white--text"
              @click="nextWord"
            >
              Trouvé
            </v-btn>
            <v-btn
              color="#E71D36"
              x-large
              class="white--text pa-8"
              @click="skipWord"
            >
              Passe
            </v-btn>
          </v-row>
        </v-col>
        <v-col>
          <span v-if="finish">
            Dernier mot trouvé
            <p class="display-3 mb-8">{{ lastWordFound }}</p></span
          >

          <v-btn
            v-if="finish"
            x-large
            color="green darken-1"
            class="mb-5 mr-12 white--text"
            @click="switchTeam"
          >
            Changer d'équipe
          </v-btn>
          <v-btn
            v-if="finish"
            x-large
            color="cyan"
            class="mb-5 white--text"
            @click="lastWordFoundAction"
          >
            Valider le dernier mot
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      soundEffect: new Audio(require("../assets/sonnerie.mp3")),
      mancheCounter: 0,
      manche: ["Phrase", "Mot", "Mime"],
      mancheFinished: false,
      timer: null,
      timeToGuess: null,
      resetButton: false,
      finish: false,
      showWord: false,
      gameFinished: false,
      beginning: false,
      color: ["Bleu", "Rouge"],
      playerIndex: [0, 0],
      lastWordFound: "",
    };
  },
  computed: {
    round() {
      return this.$store.state.round;
    },
    colorNinja() {
      if (this.round % 2 == 0) {
        return "light-blue--text";
      } else {
        return "null";
      }
    },
    colorPirate() {
      if (this.round % 2 == 1) {
        return "red--text";
      } else {
        return "null";
      }
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

    minutes() {
      return this.$store.getters.minutes;
    },
    seconds() {
      return this.$store.getters.seconds;
    },
    gameMode() {
      return this.$store.getters.gameMode;
    },
    listSkipped() {
      return this.$store.state.wordSkipped;
    },
  },
  watch: {},
  created() {
    this.$store.dispatch("fetchGame", this.$route.params.idGame);
    this.$store.dispatch("fetchPlayers", this.$route.params.idGame);
  },
  methods: {
    startTimer() {
      this.progress()
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.beginning = true;
    },
    resetTimer() {
      this.$store.commit("RESET_TIMER");
      //this.timeToGuess = this.$store.state.game.timeToGuess;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.beginning = true;
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
        //this.soundEffect.play();
      }
    },
    switchTeam() {
      this.soundEffect.pause();
      this.lastWordFound = "";
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
      this.beginning = false;
    },
    nextWord() {
      this.lastWordFound = this.currentWord;
      this.$store.commit("NEXT_WORD", {
        word: this.currentWord,
      });
      // When it finishes
      if (this.gameMode == "timesup") {
        if (this.currentWord == null && this.listSkipped.length != 0) {
          this.showWord = false;
          this.finish = true;
          this.stopTimer();
        }
        if (this.currentWord == null && this.listSkipped.length == 0) {
          this.mancheFinished = true;
          this.finish = false;
          this.stopTimer();

          if (this.mancheCounter == 2) {
            this.gameFinished = true;
          }
        }
      } else {
        if (this.currentWord == null && this.listSkipped.length == 0) {
          this.resetTimer();
          this.mancheFinished = true;
          this.gameFinished = true;
        }
      }
    },
    switchManche() {
      this.mancheFinished = false;
      this.$store.commit("RESET_LIST");
      this.mancheCounter += 1;
      this.showWord = false;
      this.switchTeam();
    },

    skipWord() {
      if (!this.resetButton) {
        this.startTimer();
      }

      this.$store.commit("SKIP_WORD", { word: this.currentWord });

      if (this.currentWord == null) {
        this.showWord = false;
        this.finish = true;
        this.stopTimer();
      }
    },
    async showWordFunction() {
      this.showWord = true;
      if (!this.resetButton) {
        await this.wait(1000);
        this.startTimer();
      }
    },
    goDashBoard() {
      this.$router.push({
        name: "DashBoard",
        params: { idGame: this.$route.params.idGame },
      });
    },
    lastWordFoundAction() {
      this.nextWord();
      this.switchTeam();
    },
    wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    },
    progress() {
      console.log("ok")
      var elem = document.getElementById("bg")
      var progressBarWidth = (this.seconds * elem.height) / 30;
      elem.animate({ height: progressBarWidth }, 500);
      if (this.seconds > 0) {
        setTimeout(function () {
          this.progress(this.seconds - 1, 30, elem);
        }, 1000);
      }
      
    },
  },
};
</script>

<style scoped>
.button {
  font-size: 16px;
}
.background {
  height: 0vh;
  background-color: aqua;
  margin: 0px;
  padding: 0px;
}
</style>
