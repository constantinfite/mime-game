<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <h1>les Mimes</h1>
      </v-row>
      <v-row justify="center" class="mx-auto">
        <v-col cols="8">
          <v-btn small color="#f46036" class="white--text mb-5"
            >Créer une partie</v-btn
          >
        
        
          <v-btn color="#1B998B" class="white--text" small
            >Rejoindre une partie</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style>
.create-game {
  background-color: #f46036;
}
</style>
