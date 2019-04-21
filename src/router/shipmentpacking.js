import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "shipmentpacking",
    path: "/shipmentpacking",
    component: asyncComponent("shipment-packing/packing"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "shipmentpackingEdit",
    path: "/shipmentpackingEdit",
    component: asyncComponent("shipment-packing/packingEdit"),
    meta: {
      sign: "shipmentpacking"
    }
  }
];
