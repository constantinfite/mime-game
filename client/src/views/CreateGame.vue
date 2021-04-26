<template lang="">
  <v-container>
    <v-row justify="center" class=" mt-5 b-12">
      <v-col cols="8" xs="8" sm="8" md="8">
        <p class="mb-8 display-1"> Configurer la partie</p>
        <v-form v-model="formValidity">
          <h3>Nombre de secondes pour deviner</h3>
          <v-text-field v-model="game.timeToGuess" required type="number"
                        placeholder="30 secondes" :rules="timeRule" />
          <v-radio-group v-model="game.mode" required row :rules="modeRule">
            <v-radio label="Mime" color="blue" value="mime" />
            <v-radio label="Time's up" color="red" value="timesup" />
          </v-radio-group>
          <v-radio-group v-model="game.alcool" required row :rules="modeRule">
            <v-radio label="Alcool" color="blue" value="alcool" />
            <v-radio label="Sobre" color="red" value="sobre" />
          </v-radio-group>
          
        </v-form>
        <v-btn :disabled="!formValidity" small color="#43A047" class="link white--text" @click="createGame">
          Créer une partie
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      game: {
        id: null,
        timeToGuess: null,
        mode: "",
        alcool:null,
        scoreBleu: 0,
        scoreRouge: 0,
      },
      formValidity: false,
      modeRule: [(value) => !!value || "Choisis le mode"],
      timeRule: [
        (v) => !!v || "Rentre le temps",
        (v) => (v>=30 ) || "Temps doit être supérieur à 30 secondes ",
        (v) => (v <= 999) || "Temps doit être inférieur à 999 secondes",
      ],
    };
  },
  created() {
    this.game.id = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
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