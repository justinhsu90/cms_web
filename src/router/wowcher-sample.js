import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "wowcherSample",
    path: "/wowcherSample",
    component: asyncComponent("wowcher/wowcherSample/wowcherSampleList"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "wowcherSampleAdd",
    path: "/wowcherSampleAdd",
    component: asyncComponent("wowcher/wowcherSample/wowcherSampleAdd"),
    meta: {
      sign: "wowcherSample"
    }
  },
  {
    name: "wowcherSampleEdit",
    path: "/wowcherSampleEdit",
    component: asyncComponent("wowcher/wowcherSample/wowcherSampleEdit"),
    meta: {
      sign: "wowcherSample"
    }
  }
];
