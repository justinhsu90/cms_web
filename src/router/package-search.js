import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "package-search",
    path: "/package-search",
    component: asyncComponent("package-search/package-search-view"),
    meta: {
      keepAlive: true
    }
  }
];
