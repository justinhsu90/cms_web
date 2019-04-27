import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "shipmentbinning",
    path: "/shipmentbinning",
    component: asyncComponent("shipment-binning/binning"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "shipmentbinningEdit",
    path: "/shipmentbinningEdit",
    component: asyncComponent("shipment-binning/binningEdit"),
    meta: {
      sign: "shipmentbinning"
    }
  }
];
