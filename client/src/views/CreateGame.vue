<template lang="">
  <v-container>
    <v-row justify="center" class=" mt-5 b-12">
      <v-col cols="8" xs="8" sm="8" md="8">
        <p class="mb-8 display-1"> Configurer la partie</p>
        <v-row>
          <v-col>
            <h3>Nombre de secondes pour deviner</h3>
            <v-text-field v-model="game.timeToGuess" type="number" placeholder="30 secondes" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col align="center"> 
            <v-btn small color="#43A047" class="link white--text" @click="createGame">
              Créer une partie
            </v-btn>
            <v-radio-group v-model="game.mode" row>
              <v-radio label="Mime" color="blue" value="mime" />
              <v-radio label="Time's up" color="red" value="timesup" />
            </v-radio-group>
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
      game: { id: null, timeToGuess: null, mode: "", scoreBleu: 0,scoreRouge:0},
    };
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
            params: { idGame: this.game.id, admin: "admin" },
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