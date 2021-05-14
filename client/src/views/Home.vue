<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <v-col cols="8" align="center">
          <h1>les Mimes</h1>
          <v-row justify="center" class="my-12">
            <v-btn
              x-large
              color="green darken-1"
              class="white--text"
              @click="createGame"
            >
              Créer une partie
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="indigo" class="white--text" x-large @click="joinGame">
              Rejoindre une partie
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
  computed: {
    soundButton() {
      return this.$store.state.soundButton;
    },
  },
  methods: {
    createGame() {
      this.soundButton.play();
      this.$router.push({
        name: "CreateGame",
      });
    },
    joinGame() {
      this.soundButton.play();
      this.$router.push({
        name: "JoinGame",
        params: { idGame: 0, admin: "player" },
      });
    },
  },
};
</script>

<style >
</style>
