import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeamMenu from "../views/TeamMenu.vue";
import CreateGame1 from "../views/CreateGame1.vue";
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
    path: "/teamMenu/:id",
    name: "TeamMenu",
    component: TeamMenu,
    props: true
  },
  {
    path: "/createGame",
    name: "CreateGame1",
    component: CreateGame1
  },
  {
    path: "/joinGame",
    name: "JoinGame",
    component: JoinGame1,
    props: true
  },
  {
    path: "/Game",
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
