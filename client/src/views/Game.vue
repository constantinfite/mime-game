<template>
  <v-container class="full-height flex-column d-flex">
    <v-row justify="center"> Team {{ currentTeam }} / Score {{ score }} </v-row>
    <v-row justify="center"> Joueur {{ currentPlayer }} </v-row>
    <v-row justify="center" class="mt-10">
      <p v-if="showWord" class="display-3">
        {{ oneWord }}
      </p>
    </v-row>
    <v-row v-if="!finish" justify="center">
      <v-btn small color="#E71D36" class="white--text mr-5" @click="skipWord">
        Passe
      </v-btn>
      <v-btn small color="#2E294E" class="white--text mr-5" @click="nextWord">
        Suivant
      </v-btn>
      <v-btn
        v-if="!showWord"
        small
        color="#2E294E"
        class="white--text"
        @click="showWordFunction"
      >
        Montrer le mot
      </v-btn>
    </v-row>
    <v-row justify="center" align="center" class="mt-1 flex-column d-flex">
      <div class="display-2 mb-5">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div v-if="!finish">
        <!--     Start Timer -->
        <v-icon v-if="!timer" x-large class @click="startTimer">
          mdi-play-circle-outline
        </v-icon>
        <!--     Pause Timer -->
        <v-icon v-if="timer" x-large class="mr-5" @click="stopTimer">
          mdi-pause-circle
        </v-icon>
        <!--     Restart Timer -->
        <v-icon v-if="resetButton" x-large @click="resetTimer">
          mdi-replay
        </v-icon>
      </div>
    </v-row>
    <v-row justify="center" class="div-bottom">
      <v-btn
        v-if="finish"
        small
        color="#f46036"
        class="mb-5 white--text"
        @click="switchTeam"
      >
        Switch Team
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,
      totalTime: 5,
      resetButton: false,
      finish: false,
      showWord: false,
      color: ["Bleu", "Rouge"],
      round: 2,
      teamIndex: 0,
    };
  },
  computed: {
    oneWord() {
      return this.$store.getters.word;
    },
    currentTeam() {
      if (this.round % 2 == 0) {
        return this.color[0];
      } else {
        return this.color[1];
      }
    },
    currentPlayer() {
      if (this.round % 2 == 0) {
        return this.$store.getters.blueTeam[this.teamIndex];
      } else {
        return this.$store.getters.redTeam[this.teamIndex];
      }
    },
    minutes: function () {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function () {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
    score() {
      if (this.round % 2 == 0) {
        return this.$store.state.score[0];
      } else {
        return this.$store.state.score[1];
      }
    },
    ...mapState(["players"]),
  },
  created() {
    this.$store.dispatch("fetchPlayers", this.$route.params.gameId);
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
      this.totalTime = 5;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      if (this.seconds > 0) {
        this.totalTime--;
      } else {
        this.stopTimer();
        this.resetButton = false;
        this.finish = true;
        this.showWord = false;
      }
    },
    switchTeam() {
      if (this.round % 2 == 1) {
        this.teamIndex += 1;
      }
      this.round += 1;
      this.finish = false;
      this.resetTimer();
    },
    nextWord() {
      this.$store.dispatch("nextWord", {
        word: this.oneWord,
        round: this.round,
      });
    },
    skipWord() {
      this.$store.dispatch("nextWord", { word: "", round: "ok" });
    },
    showWordFunction() {
      this.showWord = true;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
  position: relative;
}

.div-height {
  height: 30%;
}
</style>
