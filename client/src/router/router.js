import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Home_Timesup from "../views/Home_Timesup.vue";
import Home_Motdepasse from "../views/Home_Motdepasse.vue";
import TeamMenu from "../views/TeamMenu.vue";
import DashBoard from "../views/DashBoard.vue";
import JoinGame1 from "../views/JoinGame1.vue";
import Game_Timesup from "../views/Game_Timesup.vue";
import Game_Motdepasse from "../views/Game_Motdepasse.vue";
import CreateGame from "../views/CreateGame"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Home_Motdepasse",
    name: "Home_Motdepasse",
    component: Home_Motdepasse
  },
  {
    path: "/Home_Timesup",
    name: "Home_Timesup",
    component: Home_Timesup
  },
  {
    path: "/createGame",
    name: "CreateGame",
    component: CreateGame
  },
  {
    path: "/teamMenu/:idGame/:admin",
    name: "TeamMenu",
    component: TeamMenu,
    props: true
  },
  {
    path: "/DashBoard/:idGame/",
    name: "DashBoard",
    component: DashBoard
  },
  {
    path: "/joinGame/:idGame/:admin",
    name: "JoinGame",
    component: JoinGame1,
    props: true
  },
  {
    path: "/Game_Timesup/:idGame",
    name: "Game_Timesup",
    component: Game_Timesup,
    props: true
  },
  {
    path: "/Game_Motdepasse",
    name: "Game_Motdepasse",
    component: Game_Motdepasse,
    props: true
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
