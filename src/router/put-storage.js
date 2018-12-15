import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "put-storage",
    path: "/putStorage",
    component: asyncComponent("erp/put-storage/put-storage-list"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "put-storage-add",
    path: "/putStorageAdd",
    component: asyncComponent("erp/put-storage/put-storage-add"),
    meta: {
      sign: "putStorage"
    }
  },
  {
    name: "put-storage-edit",
    path: "/putStorageEdit",
    component: asyncComponent("erp/put-storage/put-storage-edit"),
    meta: {
      sign: "putStorage"
    }
  }
];
