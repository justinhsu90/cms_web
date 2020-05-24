<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import lget from "lodash/get";
export default {
  created() {
    axios({
      url: "/dashboard/notification/list  ",
      method: "post",
      data: {}
    }).then((res = []) => {
      res.forEach((item, index) => {
        let msg = lget(item, "msg", "");
        let id = lget(item, "dealId", "");
        this.$message({
          customClass: `notice-${index}`,
          showClose: true,
          message: msg,
          type: "info",
          duration: 0,
          onClose: () => {
            this.noticeServe(id);
          }
        });
      });
    });
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
};</script>
<style>
.notice-1 {
  top: 80px;
}
.notice-2 {
  top: 140px;
}
</style>
