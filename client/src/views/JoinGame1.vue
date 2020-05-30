<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <h3>Rentre ton petit nom</h3>
        <v-text-field
          v-model="player.name"
          placeholder="coquinou"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-radio-group v-model="player.team" column>
          <v-radio label="Equipe 1" value="1"></v-radio>
          <v-radio label="Equipe 2" value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <h3 class>Rentre le code</h3>
        <v-text-field
          v-model="game.id"
          id="input"
          color="#1B998B"
          class="input-code"
          placeholder="478577"
        ></v-text-field>
        <h3>Rentre tes mots</h3>
        <v-text-field
          placeholder="mot 1"
          v-model="player.list[0]"
        ></v-text-field>
        <v-text-field
          placeholder="mot 1"
          v-model="player.list[1]"
        ></v-text-field>
        <v-text-field
          placeholder="mot 1"
          v-model="player.list[2]"
        ></v-text-field>
        <v-text-field
          placeholder="mot 1"
          v-model="player.list[3]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        small
        color="#f46036"
        class="mb-5 link white--text"
        @click="createPlayer"
        >Rejoindre la partie
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
      player: { id: 0, name: "", list: [], team: null },
      game: { id: null }
    };
  },
  methods: {
    createPlayer() {
      this.player.id = Math.floor(Math.random() * 10000000);
      this.$store
        .dispatch("createPlayer", this.player)
        .then(() => {
          console.log("ok");
          this.$router.push({
            name: "TeamMenu",
            params: { id: this.game.id }
          });
        })
        .catch(() => {
          console.log("error");
        });
    }
  }
};
</script>

<style scoped>
.input-code {
  /* background-color: #1b998b;
  padding: 10px 10px 0px; */
}
input {
}
</style>
