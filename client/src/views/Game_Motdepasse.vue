<template>
  <v-container class="fluid d-flex mt-2">
    <v-app-bar app color="grey lighten-4">
      <v-toolbar-title class="flex text-center">
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
      </v-toolbar-title>
    </v-app-bar>
    <v-row justify="center">
      <v-col xs="8" sm="10" md="10" col="10" align="center">
        <v-row justify="center">
          <v-col xs="10" sm="10">
            <!--
            <v-chip
              v-for="(word, i) in listWord"
              :key="i"
              class="ma-2"
              :color="colorWord[i]"
              text-color="white"
            >
              X
            </v-chip>
            -->
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
            <p v-if="showWord" class="display-3 mb-8">
              {{ currentWord }}
            </p>
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
                :disabled="showButton"
                color="green "
                x-large
                fab
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
                @click="skipWord"
              >
                <v-icon size="50"> mdi-close </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="finish && !switchTeamVisible && !mancheFinished">
          <v-card
            v-for="(word, i) in listWord"
            :key="i"
            :class="colorCard(word.found)"
            class="my-3"
            @click.stop="changeStateWord(i)"
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
          <p class="headline">Passe le téléphone à l'autre équipe</p>

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
import list from "../assets/liste_famille.txt";

const soundEffect = new Audio();
export default {
  data() {
    return {
      //soundEffect: new Audio(require("../assets/timer.mp3")),
      correctSound: new Audio(require("../assets/correct_sound.mp3")),
      wrongSound: new Audio(require("../assets/wrong_sound.mp3")),
      buttonSound: new Audio(require("../assets/button3.mp3")),
      startButtonSound: new Audio(require("../assets/start.mp3")),
      mancheCounter: 0,
      listSplit: [],
      manche: ["Phrase", "Mot", "Mime"],
      mancheFinished: false,
      timer: null,
      timeToGuess: 30,
      resetButton: false,
      finish: false,
      showWord: false,
      gameFinished: false,
      beginning: false,
      showButton: false,
      switchTeamVisible: false,
      color: ["Bleu", "Rouge"],
      playerIndex: [0, 0],
      listIdWord: [],
      listWord: [],
      counterSkip: 0,
      counterGood: 0,
      counter: 0,
      delay: 0,
      round: 0,
      score: [0, 0],
      timeMinimum: null,
      randomNumber: null,
    };
  },
  computed: {
    colorWord() {
      var color = [];
      for (var i = 0; i < this.listWord.length; i++) {
        if (this.listWord[i].found) {
          color.push("green");
        } else {
          color.push("red");
        }
      }
      return color;
    },
    currentTeam() {
      if (this.round % 2 == 0) {
        return 0;
      } else {
        return 1;
      }
    },
    teamName() {
      if (this.round % 2 == 0) {
        return "Pirate";
      } else {
        return "Ninja";
      }
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
    currentWord() {
      console.log(this.counter);
      return this.listWord[this.counter].word;
    },

    minutes() {
      const minutes = Math.floor(this.timeToGuess / 60);
      return (minutes < 10 ? "0" : "") + minutes;
    },
    seconds() {
      const seconds = this.timeToGuess - this.minutes * 60;
      return (seconds < 10 ? "0" : "") + seconds;
    },

    numberWordSucceed() {
      var count = 0;
      for (var i = 0; i < this.listWord.length; i++) {
        if (this.listWord[i].found) {
          count++;
        }
      }
      return count;
    },
  },
  watch: {},
  created() {
    this.listSplit = list.split("\n");
    this.createListWord();
  },
  methods: {
    createListWord() {
      for (var i = 0; i < 5; i++) {
        this.randomNumber = Math.floor(
          Math.random() * (this.listSplit.length - 0) + 0
        );
        this.listWord.push({
          word: this.listSplit[this.randomNumber],
          found: false,
        });

        this.listSplit.splice(this.randomNumber, 1);
      }
    },
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
      if (this.timeToGuess > 1) {
        this.timeToGuess--;

        if (this.seconds == 3) {
          soundEffect.src = require("../assets/timer.mp3");
          soundEffect.play();

          //this.soundEffect.currentTime =0
          //this.soundEffect.play();
        }
      } else {
        this.stopTimer();
        this.resetButton = false;
        this.finish = true;
        this.showWord = false;
      }
    },
    switchTeam() {
      this.buttonSound.currentTime = 0;
      this.buttonSound.play();
      this.listWord = [];
      this.createListWord();

      this.switchTeamVisible = false;
      this.finish = false;
      this.resetTimer();

      this.round++;
      this.counter = 0;
      this.counterGood = 0;
      this.beginning = false;
      this.timeToGuess = 30;
    },
    valider() {
      this.buttonSound.currentTime = 0;
      this.buttonSound.play();
      this.switchTeamVisible = true;
    },
    nextWord() {
      this.score[this.currentTeam] += 1;
      this.showButton = true;
      this.correctSound.currentTime = 0;
      this.correctSound.play();
      this.timeMinimum = Date.now();

      if (this.counter > 3) {
        console.log("reinitiliaze next");
        this.listWord[this.counter].found = true;
        this.counter = 0;
        this.counterGood++;
      } else {
        this.listWord[this.counter].found = true;
        this.counterGood++;
        this.counter++;
      }

      // When it finishes

      if (this.counterGood == 5) {
        this.showWord = false;
        this.finish = true;
        this.stopTimer();
      } else {
        while (this.listWord[this.counter].found == true) {
          console.log("skip" + this.counter);
          this.counter++;
          if (this.counter > 4) {
            this.counter = 0;
          }
        }
      }

      setTimeout(this.disabledButton, 1000);
    },

    skipWord() {
      if (this.counter > 3) {
        console.log("reinitialize");
        this.counter = 0;
        this.wrongSound.currentTime = 0;
        this.wrongSound.play();
        this.timeMinimum = Date.now();
      } else {
        this.wrongSound.currentTime = 0;
        this.wrongSound.play();
        this.timeMinimum = Date.now();
        this.counter++;
      }

      while (this.listWord[this.counter].found == true) {
        console.log("skip" + this.counter);
        this.counter++;

        if (this.counter > 4) {
          this.counter = 0;
        }
      }

      if (!this.resetButton) {
        this.startTimer();
      }
    },
    showWordFunction() {
      this.buttonSound.play();
      //this.startButtonSound.play();
      this.showWord = true;
      if (!this.resetButton) {
        this.startTimer();
      }
    },
    changeWord() {
      this.listIdWord.push(this.randomNumber);
    },
    goDashBoard() {
      this.$router.push({
        name: "DashBoard",
        params: { idGame: this.$route.params.idGame },
      });
    },

    disabledButton() {
      this.showButton = false;
    },
    colorCard(found) {
      if (found) {
        return "";
      } else {
        return "red--text";
      }
    },
    changeStateWord(i) {
      if (this.listWord[i].found) {
        this.score[this.currentTeam] -= 1;
        this.listWord[i].found = !this.listWord[i].found;
      } else {
        this.score[this.currentTeam] += 1;
        this.listWord[i].found = !this.listWord[i].found;
      }
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
