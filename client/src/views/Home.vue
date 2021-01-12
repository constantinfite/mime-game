<template>
  <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <h1>les Mimes</h1>
      </v-row>
      <v-row justify="center" class="mx-auto">
        <v-col cols="8" align="center">
          <v-btn small color="#f46036" class="mb-5 link">
            <router-link to="/createGame"> Créer une partie </router-link>
          </v-btn>

          <v-btn color="#1B998B" small class="link">
            <router-link to="/joinGame"> Rejoindre une partie </router-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {}
}
</script>

<style >
</style>
