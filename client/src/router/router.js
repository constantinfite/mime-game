import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeamMenu from "../views/TeamMenu.vue";
import DashBoard from "../views/DashBoard.vue";
import JoinGame1 from "../views/JoinGame1.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    path: "/Game/:idGame",
    name: "Game",
    component: Game,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
