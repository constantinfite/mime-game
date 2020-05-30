<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <h3>Equipe 1</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <!-- eslint-disable -->

            <v-chip
              v-for="player in players"
              v-if="player.team == 1"
              :key="player.id"
            >{{ player.name }}</v-chip>
          </v-chip-group>
        </v-sheet>
        <h3>Equipe 2</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip
              v-for="player in players"
              :key="player.id"
              v-if="player.team == 2"
            >{{ player.name }}</v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
    
    <v-row justify="center">
      <v-btn color="#1B998B" small class="link">
        <router-link to="/Game">Lancer la partie</router-link>
      </v-btn>
    </v-row>
    <v-row justify="flex-start">
      <router-link to="/joinGame">
        <v-icon>mdi-arrow-left</v-icon>
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchPlayers");
  },
  computed: {
    ...mapState(["players"])
  }
};
</script>

<style scoped></style>
