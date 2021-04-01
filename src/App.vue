<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// import lget from "lodash/get";
export default {
  created() {
    // axios({
    //   url: "/dashboard/notification/list",
    //   method: "post",
    //   data: {}
    // }).then((res = []) => {
    //   res &&
    //     res.forEach((item, index) => {
    //       let msg = lget(item, "msg", "");
    //       let id = lget(item, "dealId", "");
    //       setTimeout(
    //         () => {
    //           this.$notify({
    //             type: "success",
    //             title: "提示",
    //             message: msg,
    //             duration: 0,
    //             onClose: () => {
    //               this.noticeServe(id);
    //             }
    //           });
    //         },
    //         index * 1000
    //       );
    //     });
    // });
  },
  methods: {
    noticeServe(id) {
      axios({
        url: "/dashboard/notification/markasseen",
        method: "post",
        data: {
          dealId: id
        }
      }).then(() => {});
    }
  }
};
</script>
<style>
</style>
