<template>
  <el-form :model="form" class="relative" label-position="left" label-width="70px">
    <div class="old-sku" v-if="oldImageURL">
      <img class="old-sku__img" :src="oldImageURL" alt="">
    </div>
      <el-form-item label="新SKU：" prop="newSku">
        <el-row :gutter="40">
          <el-col :span="10">
            <el-input v-model="form.newSku"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button :loading="newCheckLoading" size="small" @click="handleNewCheck">檢查</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="舊SKU：" prop="oldSku">
        <el-row :gutter="40">
          <el-col :span="10">
            <el-input v-model="form.oldSku"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button :loading="oldCheckLoading" size="small" @click="handleOldCheck">檢查</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button :loading="reassembleLoading" @click="handleReassemble" type="primary" class="ml10" size="small">重編</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      oldImageURL: "",
      reassembleLoading: false,
      newCheckLoading: false,
      oldCheckLoading: false,
      form: {
        newSku: "",
        oldSku: ""
      }
    };
  },
  methods: {
    getValue() {
      return {
        token: this.token,
        ...this.form
      };
    },
    handleReassemble() {
      this.reassembleLoading = true;
      axios({
        url: "sku/rename",
        method: "post",
        data: this.getValue()
      }).then(
        res => {
          if (!res) {
            this.$message.error("重編SKU失敗");
          } else {
            this.$message.success("重編SKU成功");
            this.$root.visible = false;
          }
          this.reassembleLoading = false;
        },
        () => {
          this.reassembleLoading = false;
        }
      );
    },
    handleNewCheck() {
      this.newCheckLoading = true;
      axios({
        url: "sku/exists",
        method: "post",
        data: {
          sku: this.form.newSku,
          token: this.token
        }
      }).then(
        res => {
          if (res) {
            this.$message.error("新SKU已存在");
          } else {
            this.$message.success("新SKU可以使用");
          }
          this.newCheckLoading = false;
        },
        () => {
          this.newCheckLoading = false;
        }
      );
    },
    handleOldCheck() {
      this.oldCheckLoading = true;
      axios({
        url: "sku/information",
        method: "post",
        data: {
          sku: this.form.oldSku,
          token: this.token
        }
      }).then(
        res => {
          if (res) {
            this.$message.success("SKU存在");
            this.oldImageURL = res.snapshotURL;
          } else {
            this.$message.error("SKU不存在");
          }
          this.oldCheckLoading = false;
        },
        () => {
          this.oldCheckLoading = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.old-sku {
  position: absolute;
  right: 0px;
  width: 200px;
  &__img {
    width: 200px;
    max-height: 200px;
  }
}
</style>
