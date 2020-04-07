import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "chart",
    path: "/chart",
    component: asyncComponent("v-chart/package-chart")
  }
];
