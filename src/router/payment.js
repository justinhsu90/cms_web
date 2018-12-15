import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "payment",
    path: "/payment",
    component: asyncComponent("erp/payment/paymentList"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "paymentAdd",
    path: "/paymentAdd",
    component: asyncComponent("erp/payment/paymentAdd"),
    meta: {
      sign: "payment"
    }
  },
  {
    name: "paymentEdit",
    path: "/paymentEdit",
    component: asyncComponent("erp/payment/paymentEdit"),
    meta: {
      sign: "payment"
    }
  }
];
