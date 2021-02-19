<template>
  <div v-loading="loading">
    <ul>
      <li
        class="down-item"
        v-for="(v, i) in data"
        :key="i"
      >
        <span class="item__index">{{ i+1 }}.</span>
        <span>{{ v.fileName }}</span>
        <a
          class="link"
          :href="v.url"
          target="_blank"
        >點擊下載</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false
    };
  },
  created() {
    this.loading = true;
    axios({
      url: "/excel/upload/template",
      method: "post",
      data: {}
    })
      .then(res => {
        this.data = res;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.down-item {
  padding: 5px 0px;
  .item__index {
    width: 10px;
    display: inline-block;
  }
}
.link {
  color: #45a2ff;
}
</style>
