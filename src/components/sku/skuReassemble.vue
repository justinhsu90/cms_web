<template>
  <el-form :model="form" class="relative" label-position="left" label-width="70px">
    <div class="old-sku"  v-if="oldImageURL">
      <h4 class="t_a-c">舊SKU產品圖</h4>
      <img class="old-sku__img" :src="oldImageURL" alt="">
    </div>
      <el-form-item label="新SKU：" prop="newSku">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-input @blur="handleNewCheck" v-model="form.newSku"></el-input>
          </el-col>
          <el-col :span="4">
            <el-tag v-if="newCheckDisabled" type="success">新 SKU 可用</el-tag>
            <el-tag v-else type="info">新 SKU 不可用</el-tag>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="舊SKU：" prop="oldSku">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-input @blur="handleOldCheck" v-model="form.oldSku"></el-input>
          </el-col>
          <el-col :span="4">
            <el-tag v-if="oldCheckDisabled" type="success">舊 SKU 可用</el-tag>
            <el-tag v-else type="info">舊 SKU 不可用</el-tag>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!newCheckDisabled || !oldCheckDisabled" :loading="reassembleLoading" @click="handleReassemble" type="primary" class="ml20" size="small">重編</el-button>
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
      newCheckDisabled: false,
      oldCheckDisabled: false,
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
      this.newCheckLoading = false;
      this.oldCheckLoading = false;
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
            this.$message.error("新SKU不可以使用");
            this.newCheckDisabled = false;
          } else {
            this.$message.success("新SKU可以使用");
            this.newCheckDisabled = true;
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
      this.newCheckLoading = false;
      this.oldCheckLoading = false;
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
            this.$message.success("SKU可使用");
            this.oldImageURL = res.snapshotURL;
            this.oldCheckDisabled = true;
          } else {
            this.$message.error("SKU不可使用");
            this.oldCheckDisabled = false;
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
  border: 1px dashed #d9d9d9;
  padding: 10px;
  &__img {
    width: 200px;
    max-height: 150px;
  }
}
</style>
