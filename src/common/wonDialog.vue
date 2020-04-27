<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="size"
  >
    <slot name="content"></slot>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        v-if="showCancel"
        @click="dialogVisible = false"
      >{{cancelButtonText}}</el-button>
      <el-button
        v-if="showConfirm"
        type="primary"
        @click="confirm"
      >{{confirmButtonText}}</el-button>
    </div>
  </el-dialog>
</template>   
<script>
export default {
  name: "wonDialog",
  props: {
    title: {
      type: String,
      default: "添加"
    },
    size: {
      type: String,
      default: "60%"
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: "確定"
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    row: {},
    name: {},
    type: {}
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  created() {
    this.$on("visible", value => {
      this.value = value;
      if (typeof value == "number") {
        value += "";
      }
      if (value) {
        this.dialogVisible = true;
      } else {
        this.dialogVisible = false;
      }
    });
  },
  methods: {
    confirm() {
      if (this.type != "form") {
        this.dialogVisible = false;
      }
      let father = this.$findFather(this.name);
      father.$emit("selectSku", [this.row, this.value]);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px !important;
}
</style>
