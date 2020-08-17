import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "candidate",
    path: "/candidate",
    component: asyncComponent("candidate/candidate"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "candidateAdd",
    path: "/candidateAdd",
    component: asyncComponent("candidate/candidateAdd"),
    meta: {
      sign: "candidate"
    }
  },
  {
    name: "candidateEdit",
    path: "/candidateEdit",
    component: asyncComponent("candidate/candidateEdit"),
    meta: {
      sign: "candidate"
    }
  }
];
