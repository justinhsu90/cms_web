import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "purchaRequire",
    path: "/purchaRequire",
    component: asyncComponent("erp/purchaRequire/purchaRequire"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "purchaAdd",
    path: "/purchaAdd",
    component: asyncComponent("erp/purchaRequire/purchaAdd"),
    meta: {
      sign: "purchaRequire"
    }
  },
  {
    name: "purchaEdit",
    path: "/purchaEdit",
    component: asyncComponent("erp/purchaRequire/purchaEdit"),
    meta: {
      sign: "purchaRequire"
    }
  }
];
