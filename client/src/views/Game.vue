<template>
  <v-container class="full-height flex-column d-flex ">
    <v-row justify="center" class="mt-10">
      <p class="display-3">{{ oneWord }}</p>
    </v-row>
    <v-row justify="center" class="">
      <v-btn small color="#E71D36" class="white--text mr-5">Passe</v-btn>
      <v-btn small color="#2E294E" @click="nextWord" class=" white--text"
        >Suivant</v-btn
      >
    </v-row>
    <v-row justify="center" align="center" class="mt-10 flex-column d-flex ">
      <div class="display-2 mb-5">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div>
        <!--     Start Timer -->
        <v-icon x-large v-if="!timer" class="" @click="startTimer"
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
    <v-row justify="center" class="mb-5"> </v-row>
    <v-row justify="center" class="div-bottom">
      <v-btn small v-if="finish" color="#f46036" class="mb-5 white--text "
        >Prochaine personne</v-btn
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
      totalTime: 30,
      resetButton: false,
      finish: true
    };
  },
  created() {
    this.$store.dispatch("fetchPlayers");
  },
  computed: {
    listWord() {
      var list = [];
      this.players.map(item => {
        item.list.map(word => {
          list.push(word);
        });
      });
      return list;
    },
    oneWord() {
      return this.listWord[Math.floor(Math.random() * this.listWord.length)];
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
      this.totalTime = 30;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      this.totalTime--;
    },
    nextWord() {
      this.listWord.splice(this.oneWord);
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
