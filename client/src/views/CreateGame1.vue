<template lang="">
  <div>
    <v-container>
      <v-row justify="center" class="mb-12">
        <h1>Create a Game</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <h3 class>Rentre le code</h3>
          <v-text-field
            id="input"
            v-model="game.code"
            color="#1B998B"
            class="input-code"
            placeholder="478577"
          />
    
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          small
          color="#f46036"
          class="mb-5 link white--text"
          @click="createGame"
        >
          Créer une partie
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      game: { id: null, code: "" },
    };
  },
  methods: {
    createGame() {
      this.game.id = Math.floor(Math.random() * 10000000);
      this.$store
        .dispatch("createGame", this.game)
        .then(() => {
          this.$router.push({
            name: "JoinGame",
            params: { admin :true },
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