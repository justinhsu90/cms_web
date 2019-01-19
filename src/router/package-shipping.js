import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "package-shipping",
    path: "/package-shipping",
    component: asyncComponent("package-shipping/package-shipping-list"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "package-shipping-add",
    path: "/putStorageAdd",
    component: asyncComponent("erp/package-shipping/package-shipping-add"),
    meta: {
      sign: "putStorage"
    }
  },
  {
    name: "package-shipping-edit",
    path: "/putStorageEdit",
    component: asyncComponent("erp/package-shipping/package-shipping-edit"),
    meta: {
      sign: "putStorage"
    }
  }
];
