<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <h1>les Mimes</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="8" align="center">
          <v-btn
            small
            color="#f46036"
            class="mr-5 link white--text"
            @click="createGame"
          >
            Créer une partie
          </v-btn>

          <v-btn color="#1B998B" small class="link">
            <router-link :to="{ name: 'JoinGame', params: { idGame: 0, admin:'player' } }">
              Rejoindre une partie
            </router-link>
          </v-btn>
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
            params: { idGame: this.game.id, admin: 'admin' },
          });
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style >
</style>
