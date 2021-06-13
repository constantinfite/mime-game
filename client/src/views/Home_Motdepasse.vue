<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <v-col cols="8" align="center">
          <h1>Mot de passe</h1>
          <v-row justify="center" class="my-12">
            <v-btn
              x-large
              color="indigo"
              class="white--text"
              @click="LaunchGame"
            >
              Lancer la partie
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      game: {
        //timeToGuess: 30,
        scoreBleu: 0,
        scoreRouge: 0,
      },
    };
  },
  computed: {
    soundButton() {
      return this.$store.state.soundButton;
    },
  },
  methods: {
    LaunchGame() {
      this.soundButton.play();
      this.$router.push({
        name: "Game_Motdepasse",
      });
      this.$store.dispatch("createGame", this.game).catch(() => {
        console.log("error");
      });
    },
  },
};
</script>

<style >
</style>
