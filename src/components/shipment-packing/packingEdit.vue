<template>
  <div v-loading="loading">
    <div style="padding:20px">
      <won-header @goBack="goBack"></won-header>
      <h2>
        <span>編輯</span>
        <span>ID: {{id}}</span>
      </h2>
      <br>
      <el-tabs
        :before-leave="checkValid"
        ref="tabs"
        tab-position="left"
        type="border-card"
        :style="{ height: maxHeight}"
        v-model="name"
      >
        <el-tab-pane
          label="發貨"
          name="formShipMent"
        >
          <shipment
            ref="formShipMent"
            v-if="!loading"
            :data="shipmentFormData"
          ></shipment>
        </el-tab-pane>
        <el-tab-pane
          label="裝箱"
          name="formBinning"
        >
          <binning
            ref="formBinning"
            v-if="
          !loading"
            :data="binningFormData"
          >
          </binning>
        </el-tab-pane>
        <el-tab-pane
          lazy
          disabled
        >
          <div
            slot="label"
            class="mt20"
          >
            <el-popover
              placement="top"
              width="160"
              v-model="popoverVisible"
            >
              <p>是否要提交？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="popoverVisible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="submit"
                >確定</el-button>
              </div>
              <el-button
                slot="reference"
                @click.stop="popoverVisible = true"
                :loading="submitLoading"
                type="primary"
                size="large"
              >保存</el-button>
            </el-popover>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import form from "won-service/_mixins/form";
import shipment from "./shipment";
import binning from "./binning";
export default {
  mixins: [form],
  components: {
    shipment,
    binning
  },
  data() {
    return {
      name: "formShipMent",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      popoverVisible: false,
      submitLoading: false,
      loading: true,
      maxHeight: "400px",
      shipmentFormData: {
        shipmentId: "",
        country: "",
        account: "",
        platform: "",
        shipoutFromWarehouseDateTime: "",
        packingDoneDateTime: "",
        waitForStockDateTime: "",
        shippingMethod: "",
        itemList: []
      },
      binningFormData: {
        packingnumber: 0,
        itemList: [
          {
            fnskuOrEan: "",
            sku: "",
            quantity: ""
          }
        ]
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    let fetchData = axios({
      url: "/shipmentPacking/shipment",
      method: "post",
      data: {
        shipmentId: this.id
      }
    });

    Promise.all([fetchData]).then(([fetchData]) => {
      this.loading = false;
      this.shipmentFormData = _.extend({}, this.shipmentFormData, fetchData);
      this.binningFormData = _.extend({}, this.binningFormData, fetchData);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.setMaxHeight();
    });
    window.addEventListener("resize", this.setMaxHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.setMaxHeight);
  },
  methods: {
    setMaxHeight() {
      var { top } = this.$refs["tabs"].$el.getBoundingClientRect();
      this.maxHeight =
        document.documentElement.clientHeight -
        top -
        20 + // padding
        "px";
      this.$refs["tabs"].$el.querySelector(
        ".el-tabs__content"
      ).style.cssText = `height:${
        this.maxHeight
      }; padding: 0px; overflow: auto; box-sizing: border-box; padding-top:10px;`;
      console.log(this.$refs["tabs"].$el.querySelector(".el-tabs__content"));
    },
    goBack() {
      this.$router.push("/shipmentpacking");
    },
    getValue() {
      let data = _.cloneDeep(this.shipmentFormData);
      return JSON.stringify(data);
    },
    checkValid(activeName, oldActiveName) {
      if (!oldActiveName) return true;
      if (!this.$refs[oldActiveName].isValid()) {
        this.$message.warning("当前页面部分信息未填写或填写错误，请检查");
        return false;
      }
      return true;
    },
    submit() {
      let pass = true;
      _.each(["formShipMent", "formBinning"], form => {
        if (this.$refs[form]) {
          pass = this.$refs[form].isValid();
          return pass; // 如果是 false 停止 each 循环
        }
      });
      return pass;
      // this.$refs["form"].validate(action => {
      //   if (action) {
      //     this.popoverVisible = false;
      //     this.submitLoading = true;
      //     axios({
      //       url: "/shipmentPacking/update",
      //       method: "post",
      //       data: {
      //         data: this.getValue()
      //       }
      //     }).then(() => {
      //       this.submitLoading = true;
      //       this.Bus.$emit("refresh");
      //       this.goBack();
      //     });
      //   }
      // });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 6px;
}
/deep/ .el-form-item__label {
  padding: 0px !important;
}

.total {
  height: 35px;
  background: #f0f9eb;
  td {
    background: transparent !important;
  }
}
#table {
  table {
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    // max-height: 100px;
    // overflow: auto;
    .btnh {
      padding: 4px 0px;
      color: #62717e;
    }
    .cell {
      padding: 0px;
    }
    /deep/ .el-form-item {
      overflow: hidden;
      margin: 0px;
    }
    /deep/ .el-form-item__content {
      line-height: 25px;
    }
    /deep/ .is-error input {
      background: #f56c6c;
      border-radius: 0%;
    }
    /deep/ .el-input__inner {
      border: none;
      height: 35px;
      text-align: center;
      color: #62717e;
      font-size: 14px;
    }
    th {
      padding: 4px;
      background: #edf1f5;
      text-align: center;
      color: #62717e;
      // border-right: 1px solid #ebeef5;
    }
    td {
      padding: 0px;
      border-top: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      text-align: center;
      background: white;
      color: #62717e;
      font-size: 14px;
    }
  }
}
</style>
