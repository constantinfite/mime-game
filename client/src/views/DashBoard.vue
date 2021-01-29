<template lang="">
  <v-container>
    <v-row justify="center" class=" mt-5 b-12">
      <v-col align="center">
        <h1>Score</h1>
        <v-row class="mt-8">
          <v-col v-for="(team, index) in teamArray" :key="index">
            <p class="headline">{{ team.nom }}</p>
            <v-chip

              :color="team.color"
              outlined
              class="headline label pa-8"
            >
              
              <p class="mb-0">{{ team.score }}</p>
              <v-icon v-if="team.winner" class="ml-5" x-large>
                mdi-trophy
              </v-icon>
            </v-chip>
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
  computed: {
    teamArray() {
      return this.$store.getters.results;
    },
  },
  created() {
    
  },
  methods: {},
};
</script>
<style lang="">
</style>