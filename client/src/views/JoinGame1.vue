<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <h3>Rentre ton petit nom</h3>
        <v-text-field v-model="player.name" placeholder="coquinou" />
      </v-col>
      <v-col cols="5">
        <v-radio-group v-model="player.team" column>
          <v-radio label="Equipe Bleue" value="1" />
          <v-radio label="Equipe Rouge" value="2" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="admin" align="center">
        <h3 class="mb-3">CODE</h3>
        <h2>
          {{ idGame }}
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <h3 class>Rentre le code</h3>
        <v-text-field
          id="input"
          v-model="player.gameId"
          color="#1B998B"
          class="input-code"
          placeholder="478577"
        />
        <h3>Rentre tes mots</h3>
        <v-text-field
          v-for="number in 5"
          :key="number"
          v-model="player.list[number]"
          :placeholder="`mot ${number}`"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        small
        color="#f46036"
        class="mb-5 link white--text"
        @click="createPlayer"
      >
        Rejoindre la partie
        <!-- <router-link :to="{ name: 'JoinGame2', params: { id: 1 } }"
          >Choisir ces mots</router-link
        > -->
      </v-btn>
    </v-row>
    <v-row>
      <router-link to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      idGame: null,
      admin: false,
      player: { id: 0, name: "", list: [], team: null, gameId: null },
    };
  },
  created() {
    this.admin = this.$route.params.admin;
    this.idGame = this.$route.params.idGame;
  },
  methods: {
    createPlayer() {
      this.player.id = Math.floor(Math.random() * 10000000);
      this.$store
        .dispatch("createPlayer", { player: this.player })
        /*this.$store
        .dispatch("fetchPlayers", { gameId: this.player.gameId })*/
        .then(() => {
          this.$router.push({
            name: "TeamMenu",
            params: { idGame: this.player.gameId, admin: this.admin },
          });
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style scoped>

input {
}
</style>
