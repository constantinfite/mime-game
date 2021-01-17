<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <v-col cols="8" align="center">
          <h1>les Mimes</h1>
          <v-row justify="center" class="my-12">
            <v-btn small color="#43A047" class="link white--text">
              <router-link
                :to="{
                  name: 'CreateGame',
                }"
              >
                Créer une partie
              </router-link>
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="indigo darken-2" small class="link">
              <router-link
                :to="{
                  name: 'JoinGame',
                  params: { idGame: 0, admin: 'player' },
                }"
              >
                Rejoindre une partie
              </router-link>
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

  methods: {},
};
</script>

<style >
</style>
