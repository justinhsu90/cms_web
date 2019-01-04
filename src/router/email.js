import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    path: "/email",
    component: asyncComponent("email/email-view")
  }
];
