<template>
  <v-container class="fluid d-flex mt-2">
    <v-app-bar app :color="colorTopBar" dark>
      <v-toolbar-title class="flex text-center">
        <span v-if="gameMode == 'timesup'" class="subtitle-1">
          Manche
          <span>
            <span class="font-weight-bold headline">
              {{ manche[mancheCounter] }}
            </span>
            -
          </span>
        </span>
        <span class="subtitle-1"> Joueur </span>
        <span class="font-weight-bold headline">{{ currentPlayer }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-row justify="center">
      <v-col xs="8" sm="10" md="10" col="10" align="center">
        <v-row justify="center">
          <v-col xs="10" sm="10">
            <div>
              {{ score[0] }}
              <v-icon size="50" :class="colorNinja" class="mr-3 ml-2">
                mdi-ninja
              </v-icon>
              <v-icon size="50" :class="colorPirate" class="mr-2">
                mdi-pirate
              </v-icon>
              {{ score[1] }}
            </div>
            <!--   Timer PART -->
            <v-chip
              v-if="!finish"
              color="default"
              outlined
              class="display-1 mb-12 mt-8 label py-8"
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
            <v-badge
              v-if="showWord"
              class="display-3 mb-8"
              color="indigo"
              :content="numberWordLeft"
            >
              {{ currentWord }}
            </v-badge>
            <v-btn
              v-if="!showWord"
              x-large
              color="indigo"
              class="py-5 white--text mb-12"
              @click="showWordFunction"
            >
              Montrer le mot
            </v-btn>
          </v-row>

          <v-row v-if="showWord" justify="center">
            <v-col cols="12" sm="6" justify="center">
              <v-btn
                color="green "
                x-large
                fab
                dark
                size="50"
                class="mr-12 pa-10 white--text"
                @click="nextWord"
              >
                <v-icon size="50" dark> mdi-check </v-icon>
              </v-btn>

              <v-btn
                color="error"
                x-large
                fab
                class="white--text pa-10"
                :disabled="disabledSkipped"
                @click="skipWord"
              >
                <v-icon size="50"> mdi-close </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="finish && !switchTeamVisible && !mancheFinished">
          <span
            v-if="
              alcoolMode == 'alcool' &&
              (finish || (mancheFinished && !gameFinished) || gameFinished)
            "
            class="headline"
          >
            l'équipe {{ teamName }} boit {{ numberWordSucceed }} gorgés
          </span>

          <v-card
            v-for="word in currentListWord"
            :key="word.id"
            :class="colorCard(word.found)"
            class="my-3"
            @click.stop="changeStateWord(word)"
          >
            <v-card-title>
              {{ word.word }}
              <v-icon v-if="word.found" right size="30" class="green--text">
                mdi-check
              </v-icon>
              <v-icon
                v-if="!word.found"
                right
                size="30"
                color="error"
                class="red--text"
              >
                mdi-close
              </v-icon></v-card-title
            >
          </v-card>
          <v-btn
            x-large
            color="green darken-1"
            class="my-5 white--text"
            @click="valider"
          >
            Valider
          </v-btn>
        </v-col>
        <v-col v-if="switchTeamVisible && finish && !mancheFinished">
          <p class="headline">Passe le téléphone à</p>
          <p class="font-weight-bold display-1">{{ nextPlayer }}</p>
          <v-btn
            x-large
            color="indigo"
            class="my-5 white--text"
            @click="switchTeam"
          >
            Changer d'équipe
          </v-btn>
        </v-col>
        <v-col v-if="!switchTeamVisible && finish && mancheFinished">
          <p>LeaderBoard</p>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

const soundEffect = new Audio();
export default {
  data() {
    return {
      soundEffect: new Audio(require("../assets/timer.mp3")),
      correctSound: new Audio(require("../assets/correct_sound.mp3")),
      wrongSound: new Audio(require("../assets/wrong_sound.mp3")),
      buttonSound: new Audio(require("../assets/button3.mp3")),
      startButtonSound: new Audio(require("../assets/start.mp3")),
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
      switchTeamVisible: false,
      color: ["Bleu", "Rouge"],
      playerIndex: [0, 0],
      counterSkip: 0,
      delay: 0,
      currentListWord: [],
      timeMinimum: null,
    };
  },
  computed: {
    teamName() {
      if (this.round % 2 == 0) {
        return "Pirate";
      } else {
        return "Ninja";
      }
    },
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
        return "orange--text";
      } else {
        return "null";
      }
    },
    colorTopBar() {
      if (this.round % 2 == 1) {
        return "orange";
      } else {
        return "light-blue";
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
      return this.$store.getters.word.word;
    },
    currentIdWord() {
      return this.$store.getters.word.id;
    },
    currentPlayer() {
      if (this.round % 2 == 0) {
        return this.$store.getters.blueTeam[this.playerIndex[0]];
      } else {
        return this.$store.getters.redTeam[this.playerIndex[1]];
      }
    },
    nextPlayer() {
      if (this.round % 2 == 1) {
        if (this.playerIndex[0] == this.$store.getters.blueTeam.length) {
          return this.$store.getters.blueTeam[0];
        }
        return this.$store.getters.blueTeam[this.playerIndex[0]];
      } else {
        if (this.playerIndex[1] == this.$store.getters.redTeam.length) {
          return this.$store.getters.redTeam[0];
        }
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
    alcoolMode() {
      return this.$store.getters.alcoolMode;
    },
    numberWordNotFound() {
      return this.$store.getters.numberOfNotFound;
    },
    disabledSkipped() {
      if (this.counterSkip > 0) {
        return true;
      } else {
        return false;
      }
    },
    numberWordLeft() {
      return this.$store.getters.listFilter.length;
    },
    numberWordSucceed() {
      var count = 0;
      for (var i = 0; i < this.currentListWord.length; i++) {
        if (this.currentListWord[i].found) {
          count++;
        }
      }
      return count;
    },
  },
  watch: {},
  created() {
    soundEffect.play();
    this.$store.dispatch("fetchGame", this.$route.params.idGame);
    this.$store.dispatch("fetchPlayers", this.$route.params.idGame);
  },
  methods: {
    startTimer() {
      //this.progress();
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
        console.log(this.seconds)
        if (this.seconds ==3) {
          soundEffect.src = 'path/to/file.mp3';
          soundEffect.play();
          
          this.soundEffect.currentTime =0
          this.soundEffect.play();
        }
      } else {
        //Dont show add last word if the time is inferior to 1second
        if (Date.now() - this.timeMinimum > 1000) {
          this.pushCurrentList(this.currentIdWord, this.currentWord, false);
          this.$store.commit("SKIP_WORD", {
            id: this.currentIdWord,
            word: this.currentWord,
          });
        }
        this.stopTimer();
        this.resetButton = false;
        this.finish = true;
        this.showWord = false;
      }
    },
    switchTeam() {
      this.buttonSound.currentTime = 0;
      this.buttonSound.play();
      this.currentListWord = [];
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
      this.switchTeamVisible = false;
      this.finish = false;
      this.resetTimer();
      this.beginning = false;
      this.counterSkip = 0;
    },
    valider() {
      this.buttonSound.currentTime = 0;
      this.buttonSound.play();
      if (this.gameMode == "timesup") {
        if (this.currentWord == null && this.numberWordNotFound == 0) {
          this.switchTeamVisible = false;
          this.mancheFinished = true;
          if (this.mancheCounter == 2) {
            this.gameFinished = true;
          }
        } else {
          this.switchTeamVisible = true;
        }
        //Mode mime
      } else {
        //If no word left game finished
        if (this.currentWord == null && this.numberWordNotFound == 0) {
          this.switchTeamVisible = false;
          this.mancheFinished = true;
          this.gameFinished = true;
        }
        //if word left change team
        else {
          this.switchTeamVisible = true;
        }
      }
    },
    nextWord() {
      this.correctSound.currentTime = 0;
      this.correctSound.play();
      this.timeMinimum = Date.now();
      this.pushCurrentList(this.currentIdWord, this.currentWord, true);

      this.$store.commit("NEXT_WORD", {
        id: this.currentIdWord,
        word: this.currentWord,
      });

      // When it finishes

      if (
        this.currentWord == null &&
        (this.numberWordNotFound != 0 || this.numberWordNotFound == 0)
      ) {
        this.showWord = false;
        this.finish = true;
        this.stopTimer();
      }
    },
    switchManche() {
      this.buttonSound.currentTime = 0;
      this.buttonSound.play();
      this.mancheFinished = false;
      this.$store.commit("RESET_LIST");
      this.mancheCounter += 1;
      this.showWord = false;
      this.switchTeam();
    },

    skipWord() {
      this.wrongSound.currentTime = 0;
      this.wrongSound.play();
      this.timeMinimum = Date.now();
      this.pushCurrentList(this.currentIdWord, this.currentWord, false);
      this.$store.commit("SKIP_WORD", {
        id: this.currentIdWord,
        word: this.currentWord,
      });
      if (!this.resetButton) {
        this.startTimer();
      }

      if (this.currentWord == null) {
        this.showWord = false;
        this.finish = true;
        this.stopTimer();
      }
      this.counterSkip += 1;
    },
    showWordFunction() {
      this.buttonSound.play();
      //this.startButtonSound.play();
      this.showWord = true;
      if (!this.resetButton) {
        this.startTimer();
      }
    },
    goDashBoard() {
      this.$router.push({
        name: "DashBoard",
        params: { idGame: this.$route.params.idGame },
      });
    },

    wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    },
    colorCard(found) {
      if (found) {
        return "";
      } else {
        return "red--text";
      }
    },
    changeStateWord(word) {
      this.$store.commit("CHANGE_STATE_WORD", {
        id: word.id,
      });
      var index = this.currentListWord.findIndex((x) => x.id === word.id);
      this.currentListWord[index].found = !this.currentListWord[index].found;
    },
    pushCurrentList(id, word, found) {
      this.currentListWord.push({
        id: id,
        word: word,
        found: found,
      });
    },
    /*progress() {
      console.log("ok");
      var elem = document.getElementById("bg");
      var progressBarWidth = (this.seconds * elem.height) / 30;
      elem.animate({ height: progressBarWidth }, 500);
      if (this.seconds > 0) {
        setTimeout(function () {
          this.progress(this.seconds - 1, 30, elem);
        }, 1000);
      }
    },*/
  },
};
</script>

<style scoped>
.button {
  font-size: 16px;
}
</style>
