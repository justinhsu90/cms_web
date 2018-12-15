import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "documentManage",
    path: "/documentManage",
    component: asyncComponent("documentManage/documentManage"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "documentEdit",
    path: "/documentEdit",
    component: asyncComponent("documentManage/documentEdit"),
    meta: {
      sign: "documentManage"
    }
  },
  {
    name: "documentAdd",
    path: "/documentAdd",
    component: asyncComponent("documentManage/documentAdd"),
    meta: {
      sign: "documentManage"
    }
  }
];
