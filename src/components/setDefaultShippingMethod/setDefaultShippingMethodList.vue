<template>
    <div>
        <el-row class="mb5">
            <h3>
                <div class="ibbox">
                    <span>設定出貨方式</span>
                    <span class="label-tips fz14">
                    請先選擇貨代,在選擇運輸方式
                    </span>
                </div>
                <div class="ibbox">
                    <el-button size="small" type="primary" :loading="pullLoading" @click="handleClick">抓取小包清單</el-button>
                    <el-button size="small" type="primary" :loading="fileLoading" @click="submit">保存設定</el-button>
                </div>
            </h3>
        </el-row>
        <el-row class="mb5" :gutter="10">            
                <el-select class="w10" placeholder="多個愛爾蘭貨代" v-model="imoresearchAgent">
                    <el-option v-for="(v,i) in imoreagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select  class="w10" placeholder="多個愛爾蘭發貨渠道" v-model="imoresearchShippingMethod">
                    <el-option v-for="(v,i) in imoreSerachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>  
                <el-select class="w10" placeholder="愛爾蘭貨代" v-model="isearchAgent" @change="handleAgentChange('iagent')">
                    <el-option v-for="(v,i) in iagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select  class="w10" placeholder="愛爾蘭發貨渠道" v-model="isearchShippingMethod" @change="handleChangeShippingMethod('iagent')">
                    <el-option v-for="(v,i) in iserachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>   
                <el-select class="w10" placeholder="多個英國貨代" v-model="ymoresearchAgent">
                    <el-option v-for="(v,i) in ymoreagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w10" placeholder="多個英國發貨渠道" v-model="ymoresearchShippingMethod">
                    <el-option v-for="(v,i) in ymoreserachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>
                <el-select class="w10" placeholder="英國貨代" v-model="ysearchAgent" @change="handleAgentChange('yagent')">
                    <el-option v-for="(v,i) in yagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w10" placeholder="英國發貨渠道" v-model="ysearchShippingMethod" @change="handleChangeShippingMethod('yagent')">
                    <el-option v-for="(v,i) in yserachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>
        </el-row>
        <el-row>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
                    <el-table-column width="50" label="國家" prop="country"></el-table-column>
                    <el-table-column width="70" label="重量" prop="parcelWeight">
                           <template slot-scope="scope">
                           {{scope.row.parcelWeight}}kg
                          </template>

                    </el-table-column>
                    <el-table-column min-width="50" label="貨代" prop="agent">
                        <template slot-scope="{row}">
                            <el-select v-model="row.agent" @change="handleChange(row)">
                                <el-option v-for="(v,i) in methodAgent(row)" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="70" label="發貨渠道" prop="shippingMethod">
                        <template slot-scope="{row}">
                            <el-select v-model="row.shippingMethod">
                                <el-option v-for="(v,i) in row.shippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="220" label="商品名稱" prop="productName"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      fileLoading: false,
      pullLoading: false,
      tableData: [],
      condition: [],
      searchShippingMethodOption: [],
      maxHeight: 450,
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        order: "",
        limit: 15
      },
      fetchOption: {
        url: "shipment/productList",
        where: "",
        method: "post"
      },
      platform: [],
      shippingMethodAgent: [],
      shippingMethodData: [],
      serachShippingMethodData: [],
      imoresearchAgent: "",
      imoresearchShippingMethod: "",
      imoreSerachShippingMethodData: [],
      isearchAgent: "",
      iserachShippingMethodData: [],
      isearchShippingMethod: "",
      ymoresearchAgent: "",
      ymoreserachShippingMethodData: [],
      ymoresearchShippingMethod: "",
      ysearchAgent: "",
      yserachShippingMethodData: [],
      ysearchShippingMethod: "",
      searchShippingMethod: "YTYGB",
      searchAgent: "YD",
      agent: [],
      iagent: [],
      yagent: [],
      imoreagent: [],
      ymoreagent: []
    };
  },
  created() {
    axios({
      url: "shipment/shippingMethod",
      method: "post",
      data: {
        token: this.token
      }
    }).then(shippingMethod => {
      let shippingMethodAgent = [];
      let iagent = [];
      let yagent = [];
      let shippingMethodData = _.cloneDeep(shippingMethod);
      this.agent = _.cloneDeep(shippingMethod);
      _.each(shippingMethod, v => {
        if (!shippingMethodAgent.includes(v.shippingMethodAgent)) {
          shippingMethodAgent.push(v.shippingMethodAgent);
        }
        if (v.shippingMethodCountry == "IE") {
          if (!iagent.includes(v.shippingMethodAgent)) {
            iagent.push(v.shippingMethodAgent);
          }
        }
        if (v.shippingMethodCountry == "GB") {
          if (!yagent.includes(v.shippingMethodAgent)) {
            yagent.push(v.shippingMethodAgent);
          }
        }

        if (v.shippingMethodCountry == "Batch_IE") {
          this.imoreagent.push(v.shippingMethodAgent);
          this.imoresearchAgent = v.shippingMethodAgent;
          this.imoresearchShippingMethod = v.shippingMethodCode;
          this.imoreSerachShippingMethodData.push(v);
        }

        if (v.shippingMethodCountry == "Batch_GB") {
          this.ymoreagent.push(v.shippingMethodAgent);
          this.ymoresearchAgent = v.shippingMethodAgent;
          this.ymoresearchShippingMethod = v.shippingMethodCode;
          this.ymoreserachShippingMethodData.push(v);
        }
      });
      this.shippingMethodAgent = shippingMethodAgent;
      this.shippingMethodData = shippingMethodData;
      this.iagent = iagent;
      this.yagent = yagent;
      this.handleChange("agent");
    });
  },
  methods: {
    methodAgent(row) {
      let data = _.filter(this.agent, v => {
        return v.shippingMethodCountry == row.country;
      });
      let agent = [];
      _.each(data, v => {
        if (!agent.includes(v.shippingMethodAgent)) {
          agent.push(v.shippingMethodAgent);
        }
        return;
      });
      return agent;
    },
    handleClick() {
      this.pullLoading = true;
      this.handleSearch();
    },
    handleCondition() {
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data
      }).then(res => {
        this.isTableLoading = false;
        this.pullLoading = false;
        this.tableData = _.cloneDeep(res);
        _.each(this.tableData, v => {
          if (v.agent) {
            let data = _.filter(this.shippingMethodData, value => {
              return value.shippingMethodAgent == v.agent;
            });
            this.$set(v, "shippingMethodData", data);
          } else {
            this.$set(v, "shippingMethodData", []);
          }
        });
      });
    }, 500),
    handleChangeShippingMethod(val) {
      if (val == "iagent") {
        _.each(this.tableData, v => {
          if (v.country == "IE") {
            v.shippingMethod = this.isearchShippingMethod;
          }
        });
      }
      if (val == "yagent") {
        _.each(this.tableData, v => {
          if (v.country == "GB") {
            v.shippingMethod = this.ysearchShippingMethod;
          }
        });
      }
    },
    handleAgentChange(val) {
      if (val == "imoreagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.imoresearchAgent;
        });
        this.imoreSerachShippingMethodData = data;
        this.imoresearchShippingMethod = "";
      }

      if (val == "iagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.isearchAgent;
        });
        this.iserachShippingMethodData = data;
        this.isearchShippingMethod = "";
        _.each(this.tableData, v => {
          if (v.country == "IE") {
            v.agent = this.isearchAgent;
            this.handleChange(v);
          }
        });
      }

      if (val == "ymoreagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.ymoresearchAgent;
        });
        this.ymoreserachShippingMethodData = data;
        this.ymoresearchShippingMethod = "";
      }

      if (val == "yagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.ysearchAgent;
        });
        this.yserachShippingMethodData = data;
        this.ysearchShippingMethod = "";
        _.each(this.tableData, v => {
          if (v.country == "GB") {
            v.agent = this.ysearchAgent;
            this.handleChange(v);
          }
        });
      }
    },
    handleChange(row) {
      if (row == "agent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.searchAgent;
        });
        this.serachShippingMethodData = data;
        return;
      }
      if (row == "iagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.isearchAgent;
        });
        this.iserachShippingMethodData = data;
        return;
      }
      if (row == "yagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == this.ysearchAgent;
        });
        this.yserachShippingMethodData = data;
        return;
      }
      if (row != "agent" && row != "iagent") {
        let data = _.filter(this.shippingMethodData, value => {
          return value.shippingMethodAgent == row.agent;
        });
        row.shippingMethodData = data;
        row.shippingMethod = "";
      }
    },
    getValue() {
      let data = this.tableData;
      var init = false;
      _.each(data, v => {
        if (init) return;
        if (!v.agent || !v.shippingMethod) {
          init = true;
          this.$message.warning("選擇下貨代或運輸方式必須全部填寫");
          return;
        }
        delete v.shippingMethodData;
      });
      if (init) {
        return false;
      }
      if (this.searchAgent && this.searchShippingMethod) {
        data.push({
          productName: "batch",
          country: "GB",
          shippingMethod: this.searchShippingMethod,
          agent: this.searchAgent,
          parcelWeight: 0
        });
      }
      let obj = {
        token: this.token,
        value: JSON.stringify({ data })
      };
      return obj;
    },
    submit() {
      if (this.getValue()) {
        this.fileLoading = true;
        axios({
          url: "shipment/setshipingmethod",
          method: "post",
          data: this.getValue()
        })
          .then(() => {
            this.$message.success("保存成功");
            this.fileLoading = false;
          })
          .catch(() => {
            this.$message.error("保存失敗");
          });
      }
    }
  }
};
</script>
