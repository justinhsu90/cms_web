<template>
  <div>
    <div>
      <slot name="data"></slot>
      <div class="clearfix"></div>
    </div>
    <div
      class="loading"
      v-if="showLoading"
    >
      <div class="el-icon-loading"></div>
    </div>
    <div
      v-if="showEnd"
      class="end"
    >已經滑到底部了哦...</div>

  </div>
</template>

<script>
export default {
  props: ["fetchData", "target"],
  data() {
    return {
      showLoading: false,
      showEnd: false
    };
  },
  created() {
    this.skip = 0;
    this.limit = 20;
    this.scroll();
  },
  mounted() {
    let el = document.querySelector(this.target);
    let func = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
        !this.showLoading &&
        !this.showEnd
      ) {
        this.scroll();
      }
    };
    el.addEventListener("scroll", func);
    this.$once("hook:beforeDestory", () => {
      el.removeEventListener("scroll", func);
    });
  },
  methods: {
    refresh() {
      this.skip = 0;
      this.limit = 20;
      this.showLoading = false;
      this.showEnd = false;
      this.scroll();
    },
    async scroll() {
      if (this.showEnd) return;
      this.showLoading = true;
      let data = await this.fetchData({
        skip: this.skip,
        limit: this.limit
      });
      this.showLoading = false;
      if (data.length < 20) {
        this.showEnd = true;
      } else {
        this.skip += 20;
        this.limit += 20;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  color: #999;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  flex-direction: column;
}
.end {
  text-align: center;
  color: #999;
  padding: 20px 0px;
}
</style>
