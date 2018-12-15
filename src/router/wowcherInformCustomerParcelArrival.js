import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "wowcherInformCustomerParcelArrival",
    path: "/wowcherInformCustomerParcelArrival",
    component: asyncComponent(
      "wowcher/wowcherInformCustomerParcelArrival/wowcherInformCustomerParcelArrival"
    ),
    meta: {
      keepAlive: true
    }
  }
];
