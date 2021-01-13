<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <h3>Team Bleu</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip v-for="player in blueTeam" :key="player.id">{{
              player
            }}</v-chip>
          </v-chip-group>
        </v-sheet>
        <h3>Team Rouge</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip v-for="player in redTeam" :key="player.id">{{
              player
            }}</v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="center">
      <!--v-if="admin"-->
      <v-btn color="#1B998B" class="mb-5 link white--text" @click="startGame">
        Lancer la partie
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
export default {
  data() {
    return {
      admin: false,
    };
  },
  computed: {
    //...mapState(['players']),
    blueTeam() {
      return this.$store.getters.blueTeam;
    },
    redTeam() {
      return this.$store.getters.redTeam;
    },
  },
  created() {
    this.$store.dispatch("fetchPlayers", this.$route.params.gameId);
    this.admin = this.$route.params.admin;
  },
  methods: {
    startGame() {
      this.$router.push({
        name: "Game",
        params: { gameId: this.$route.params.gameId },
      });
    },
  },
};
</script>

<style scoped></style>
