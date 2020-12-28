import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "updateShipmentInfo",
    path: "/updateShipmentInfo",
    component: asyncComponent("updateShipmentInfo/updateShipmentInfo")
  }
];
