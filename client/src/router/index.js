import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeamMenu from "../views/TeamMenu.vue";
import CreateGame1 from "../views/CreateGame1.vue";
import CreateGame2 from "../views/CreateGame2.vue";
import JoinGame1 from "../views/JoinGame1.vue";
import JoinGame2 from "../views/JoinGame2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/teamMenu/id",
    name: "TeamMenu",
    component: TeamMenu
  },
  {
    path: "/createGame",
    name: "CreateGame1",
    component: CreateGame1
  },
  {
    path: "/createGame/id",
    name: "CreateGame2",
    component: CreateGame2
  },
  {
    path: "/joinGame",
    name: "JoinGame1",
    component: JoinGame1
  },
  {
    path: "/joinGame/id",
    name: "JoinGame2",
    component: JoinGame2
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
