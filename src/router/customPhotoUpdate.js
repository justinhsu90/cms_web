import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "customPhotoUpdate",
    path: "/customPhotoUpdate",
    component: asyncComponent("customPhotoUpdate/index")
  }
];
