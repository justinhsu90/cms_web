import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "shipment",
    path: "/shipment",
    component: asyncComponent("shipment/shipment"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "shipmentEdit",
    path: "/shipmentEdit",
    component: asyncComponent("shipment/shipmentEdit"),
    meta: {
      sign: "shipment"
    }
  },
  {
    name: "shipmentAdd",
    path: "/shipmentAdd",
    component: asyncComponent("shipment/shipmentAdd"),
    meta: {
      sign: "shipment"
    }
  }
];
