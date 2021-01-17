<template lang="">
  <v-container>
    <v-row justify="center" class=" mt-5 b-12">
      <v-col align="center">
        <h1>Score</h1>
        <v-row class="mt-8">
          <v-col>
            <p>Bleu</p>
          </v-col>
          <v-col>
            <p>Rouge</p>
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