<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <v-col cols="8" align="center">
          <h1>Liste des jeux</h1>
          <v-row justify="center" class="my-12">
            <v-btn
              x-large
              color="green darken-1"
              class="white--text"
              @click="GoMotdepasse"
            >
              Mot de passe
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="indigo" class="white--text" x-large @click="GoTimesup">
              Time's Up
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
    GoMotdepasse() {
      this.soundButton.play();
      this.$router.push({
        name: "Home_Motdepasse",
      });
    },
    GoTimesup() {
      this.soundButton.play();
      this.$router.push({
        name: "Home_Timesup",
      });
    },
  },
};
</script>

<style >
</style>
