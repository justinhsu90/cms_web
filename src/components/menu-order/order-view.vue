<template>
  <div>
    <h3 class="mb10">菜单排序 <span class="label-tips fz14">菜單通過拖拽進行排序</span></h3>
    <div>
      <el-card>
        <el-tree
          :data="data"
          :props="defaultProps"
          draggable
        >
        </el-tree>
      </el-card>
    </div>
    <el-button class="mt10" @click="submit" size="medium" type="primary">保存</el-button>
  </div>
</template>
<script>
import navData from "@/common/navData";
export default {
  data() {
    let data = _.cloneDeep(navData);
    return {
      data,
      defaultProps: {
        children: "child",
        label: "label"
      }
    };
  },
  methods: {
    submit() {
      console.log(this);
      console.log(this.data);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
