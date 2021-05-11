<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-col align="center">
          <v-chip color="default" outlined class="headline mb-4 label py-8">
            <p class="mb-0">
              Code :
              <span class="font-weight-bold">
                {{ $route.params.idGame }}
              </span>
            </p>
          </v-chip>
        </v-col>

        <h3>Team Bleu</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip
              v-for="player in blueTeam"
              :key="player.id"
              color="blue"
              text-color="white"
            >
              {{ player }}</v-chip
            >
          </v-chip-group>
        </v-sheet>
        <h3>Team Rouge</h3>
        <v-sheet elevation="0" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip
              v-for="player in redTeam"
              :key="player.id"
              color="red"
              text-color="white"
            >
              {{ player }}</v-chip
            >
          </v-chip-group>
        </v-sheet>
        <p v-if="$route.params.admin === 'player'" class="headline">
          Tu peux poser ton téléphone, il ne te servira plus ;)
        </p>
        <v-row v-if="$route.params.admin === 'admin'" justify="center">
          <v-btn
            color="indigo darken-2"
            class="my-10 link white--text"
            @click="startGame"
          >
            Lancer la partie
          </v-btn>
        </v-row>

        <v-row class="mt-10">
          <router-link
            :to="{
              name: 'JoinGame',
              params: { idGame: 0, admin: 'player' },
            }"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </router-link>
        </v-row>
      </v-col>
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
    this.$store.dispatch("fetchPlayers", this.$route.params.idGame);
  },
  methods: {
    startGame() {
      this.$router.push({
        name: "Game",
        params: { idGame: this.$route.params.idGame },
      });
    },
  },
};
</script>

<style scoped></style>
