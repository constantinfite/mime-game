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
            <h3>Choisis ton équipe</h3>
            <v-form ref="SignUpForm" v-model="formValidity">
              <v-radio-group
                v-model="player.team"
                required
                row
                :rules="radioRule"
              >
                <template #label />
                <v-radio label="Bleu" color="blue" value="1">
                  <template #label>
                    <v-icon size="50" :class="colorNinja" class="mr-3 ml-2">
                      mdi-ninja
                    </v-icon>
                  </template>
                </v-radio>
                <v-radio label="Rouge" color="orange" value="2">
                  <template #label>
                    <v-icon size="50" :class="colorPirate" class="mr-2">
                      mdi-pirate
                    </v-icon>
                  </template></v-radio
                >
              </v-radio-group>
              <v-text-field
                v-model="player.name"
                required
                :rules="nameRule"
                placeholder="coquinou"
                label="Rentre ton petit nom"
              />
              <!--<h3 class>Rentre le code</h3>-->
              <v-text-field
                v-if="$route.params.admin === 'player'"
                id="input"
                v-model="player.gameId"
                label="Code de la partie"
                class="input-code"
                placeholder="785"
                :rules="[codeValidity || 'Code est mauvais']"
                required
                @keyup="check()"
              />
              <h3 class="mt-5">Rentre tes mots</h3>
              <v-row>
                <v-col xs="12" sm="12" md="12" align="center">
                  <v-text-field
                    v-for="number in numberOfWord"
                    :key="number"
                    v-model="player.list[number - 1]"
                    :label="`mot ${number}`"
                    :placeholder="exampleWord[number - 1]"
                    :rules="wordRule"
                    required
                  />
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    elevation="0"
                    color="green darken-2"
                    @click="addWord"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="error"
                    @click="removeWord"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-btn
            :disabled="!formValidity"
            color="indigo"
            class="mb-5 white--text"
            @click="createPlayer"
          >
            Rejoindre la partie
            <!-- <router-link :to="{ name: 'JoinGame2', params: { id: 1 } }"
          >Choisir ces mots</router-link
        > --><v-icon right>mdi-rocket-launch</v-icon>
          </v-btn>
        </v-row>

        <v-row justify="flex-start">
          <router-link to="/" class="mt-5 mb-10">
            <v-icon left>mdi-arrow-left</v-icon>
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
      numberOfWord: [1, 2, 3, 4, 5],
      idGame: null,
      player: { id: 0, name: "", list: [], team: null, gameId: null },
      formValidity: false,
      codeValidity: false,
      exampleWord: [
        "Pizza",
        "Roller",
        "Argentine",
        "Le Pape",
        "Démerde toi :)",
      ],
      nameRule: [(value) => !!value || "Ton nom est nécessaire"],
      radioRule: [(value) => !!value || "Selectionne ton équipe"],
      wordRule: [(value) => !!value || "Rentre ton mot sinon ça marche pas"],
    };
  },

  computed: {
    colorNinja() {
      if (this.player.team % 2 == 1) {
        return "light-blue--text";
      } else {
        return "null";
      }
    },
    colorPirate() {
      if (this.player.team % 2 == 0 && this.player.team !== null) {
        return "orange--text";
      } else {
        return "null";
      }
    },
    soundButton() {
      return this.$store.state.soundButton;
    },
  },
  created() {
    this.idGame = this.$route.params.idGame;
    if (this.$route.params.admin === "admin") {
      this.player.gameId = this.$route.params.idGame;
    }
  },

  methods: {
    check() {
      axios
        .get("https://data-base-mime.herokuapp.com/games/" + this.player.gameId)
        .then(() => {
          this.codeValidity = true;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log("error");
            this.codeValidity = false;
          }
        });
    },

    onSubmit() {
      this.createPlayer();
    },

    createPlayer() {
      this.soundButton.play();
      this.player.id = Math.floor(Math.random() * 10000000);

      //MONGODB POST DATA

      axios
        .post("/api/WordDataList", this.player)
        .then(() => {
          console.log("Store in MongoDB");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log("error Mongodb");
          }
        });

      // post in data-base-mime.herokuapp.com
      
      this.$store
        .dispatch("createPlayer", { player: this.player })
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
    removeWord() {
      //var length = this.numberOfWord.length;
      if (this.player.list.length >= this.numberOfWord.length) {
        this.numberOfWord.pop();
        this.player.list.pop();
      } else {
        this.numberOfWord.pop();
      }
    },
  },
};
</script>

<style scoped>
</style>
