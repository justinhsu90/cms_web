import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "gogroopieDealList",
    path: "/gogroopieDealList",
    component: asyncComponent("gogroopie/gogroopieDeal/gogroopieDealList"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "gogroopieDealEdit",
    path: "/gogroopieDealEdit",
    component: asyncComponent("gogroopie/gogroopieDeal/gogroopieDealEdit"),
    meta: {
      sign: "gogroopieDealList"
    }
  },
  {
    name: "gogroopieDealAdd",
    path: "/gogroopieDealAdd",
    component: asyncComponent("gogroopie/gogroopieDeal/gogroopieDealAdd"),
    meta: {
      sign: "wowcherDealList"
    }
  }
];
