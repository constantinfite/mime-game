<template>
  <v-container class="fluid mt-5">
    <v-row justify="center">
      <v-col cols="8" xs="8" sm="8" md="8">
        <v-row v-if="$route.params.admin === 'admin'">
          <v-col align="center">
            <v-chip color="default" outlined class="headline mb-4 label py-8">
              <p class="mb-0">
                Code :
                <span class="font-weight-bold">
                  {{ idGame }}
                </span>
              </p>
            </v-chip>
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-5">
          <v-col>
            <div><strong>Choisis ton équipe </strong></div>

            <v-radio-group row v-model="player.team">
              <template v-slot:label> </template>
              <v-radio label="Bleu" color="blue" value="1"
                ><template v-slot:label>
                  <div>
                    <strong class="blue--text">Bleu</strong>
                  </div>
                </template>
              </v-radio>
              <v-radio label="Rouge" color="red" value="2">
                <template v-slot:label>
                  <div>
                    <strong class="red--text">Rouge</strong>
                  </div>
                </template></v-radio
              >
            </v-radio-group>
            <v-text-field
              v-model="player.name"
              placeholder="coquinou"
              label="Rentre ton petit nom"
            />
            <!--<h3 class>Rentre le code</h3>-->
            <v-text-field
              id="input"
              label="Code de la partie"
              v-model="player.gameId"
              color="#1B998B"
              class="input-code"
              placeholder="478577"
              @keyup="check()"
            />
            <h3 class="mt-5">Rentre tes mots</h3>
            <v-row>
              <v-col xs="6" sm="6" md="6">
                <v-text-field
                  v-for="number in oddNumbers"
                  :key="number"
                  v-model="player.list[number - 1]"
                  :placeholder="`mot ${number}`"
                />
              </v-col>
              <v-col xs="6" sm="6" md="6">
                <v-text-field
                  v-for="number in evenNumbers"
                  :key="number"
                  v-model="player.list[number - 1]"
                  :placeholder="`mot ${number}`"
                />
              </v-col>
            </v-row>
            <!--
            <v-btn
              class="ma-2"
              text
              icon
              color="indigo darken-2"
              @click="addWord"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            -->
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            :disabled="isDisabled"
            color="indigo darken-2"
            class="mb-5 link white--text"
            @click="createPlayer"
          >
            Rejoindre la partie
            <!-- <router-link :to="{ name: 'JoinGame2', params: { id: 1 } }"
          >Choisir ces mots</router-link
        > -->
          </v-btn>
        </v-row>

        <v-row justify="flex-start">
          <router-link to="/" class="mt-5 mb-10">
            <v-icon>mdi-arrow-left</v-icon>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isDisabled: false,
      numberOfWord: [1, 2, 3, 4, 5],
      idGame: null,
      player: { id: 0, name: "", list: [], team: null, gameId: null },
    };
  },
  computed: {
    evenNumbers() {
      return this.numberOfWord.filter(function (number) {
        return number % 2 === 0;
      });
    },
    oddNumbers() {
      return this.numberOfWord.filter(function (number) {
        return number % 2 === 1;
      });
    },
  },
  created() {
    this.idGame = this.$route.params.idGame;
  },
  methods: {
    check() {
      axios
        .get("http://localhost:3000/games/" + this.player.gameId)
        .then((this.isDisabled = false))
        .catch((error) => {
          if (error.response.status === 404) {
            console.log(error);
            this.isDisabled = true;
          }
        });
    },

    onSubmit() {
      this.createPlayer();
    },

    createPlayer() {
      this.player.id = Math.floor(Math.random() * 10000000);
      this.$store
        .dispatch("createPlayer", { player: this.player })
        /*this.$store
        .dispatch("fetchPlayers", { gameId: this.player.gameId })*/
        .then(() => {
          this.$router.push({
            name: "TeamMenu",
            params: {
              idGame: this.player.gameId,
              admin: this.$route.params.admin,
            },
          });
        })
        .catch(() => {
          console.log("error");
        });
    },
    addWord() {
      var length = this.numberOfWord.length;
      this.numberOfWord.push(length + 1);
    },
  },
};
</script>

<style scoped>
</style>
