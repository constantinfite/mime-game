<template lang="">
  <v-container>
    <v-row justify="center" class=" mt-5 b-12">
      <v-col align="center">
        <h1>Score</h1>
        <v-row class="mt-8">
          <v-col v-for="(team, index) in teamArray" :key="index">
            <p class="headline">{{ team.nom }}</p>
            <v-chip

              :color="team.color"
              outlined
              class="headline label pa-8"
            >
              
              <p class="mb-0">{{ team.score }}</p>
              <v-icon v-if="team.winner" x-large @click="stopTimer">
                mdi-trophy
              </v-icon>
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      game: { id: null },
    };
  },
  computed: {
    teamArray() {
      var array = [];

      array.push({
        nom: "Bleu",
        winner: this.$store.state.score[0] > this.$store.state.score[1],
        score: this.$store.state.score[0],
        color: "blue",
      });
      array.push({
        nom: "Rouge",
        winner: this.$store.state.score[0] < this.$store.state.score[1],
        score: this.$store.state.score[1],
        color: "red",
      });
      return array;
    },
  },
  created() {
    this.game.id = Math.floor(Math.random() * 1000000);
  },
  methods: {
    createGame() {
      this.$store
        .dispatch("createGame", this.game)
        .then(() => {
          this.$router.push({
            name: "JoinGame",
            params: { admin: true },
          });
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>
<style lang="">
</style>