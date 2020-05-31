<template>
  <v-container class="full-height flex-column d-flex">
    <v-row justify="center">Team {{ currentTeam }}</v-row>
    <v-row justify="center">Joueur {{ currentPlayer }}</v-row>
    <v-row justify="center" class="mt-10">
      <p v-if="this.resetButton" class="display-3">{{ oneWord }}</p>
    </v-row>
    <v-row justify="center" class>
      <v-btn small color="#E71D36" class="white--text mr-5">Passe</v-btn>
      <v-btn small color="#2E294E" @click="nextWord" class="white--text"
        >Suivant</v-btn
      >
    </v-row>
    <v-row justify="center" align="center" class="mt-10 flex-column d-flex">
      <div class="display-2 mb-5">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div>
        <!--     Start Timer -->
        <v-icon x-large v-if="!timer" class @click="startTimer"
          >mdi-play-circle-outline</v-icon
        >
        <!--     Pause Timer -->
        <v-icon x-large v-if="timer" class="mr-5" @click="stopTimer"
          >mdi-pause-circle</v-icon
        >
        <!--     Restart Timer -->
        <v-icon x-large v-if="resetButton" @click="resetTimer"
          >mdi-replay</v-icon
        >
      </div>
    </v-row>
    <v-row justify="center" class="div-bottom">
      <v-btn
        small
        v-if="finish"
        color="#f46036"
        @click="switchTeam"
        class="mb-5 white--text"
        >Switch Team</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,
      totalTime: 3,
      resetButton: false,
      finish: false,
      color: ["Bleue", "Rouge"],
      round: 2
    };
  },
  created() {
    this.$store.dispatch("fetchPlayers");
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
      var i = 0;
      if (this.round % 2 == 0) {
        return this.$store.getters.blueTeam[i];
      } else {
        return this.$store.getters.redTeam[i];
      }
    },
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
    ...mapState(["players"])
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
      this.totalTime = 3;
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
        this.finish = true;
      }
    },
    switchTeam() {
      this.round += 1;
    },
    nextWord() {
      this.$store.dispatch("passWord", this.oneWord);
    }
  }
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
